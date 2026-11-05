
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "../../data/weddingConfig";
import Reveal from "../Reveal";
import "./ScratchCard.css";

const SCRATCH_THRESHOLD = 30;
const FLOWER_COUNT = 36;

const ScratchCard = () => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const scratchingRef = useRef(false);
  const revealedRef = useRef(false);
  const lastProgressCheckRef = useRef(0);
  const flowerTimerRef = useRef(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [flowers, setFlowers] = useState([]);

  // Draw the gold coating over the date.
  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;

    if (!card || !canvas) return;

    const drawCover = () => {
      if (revealedRef.current) return;

      const width = card.clientWidth;
      const height = card.clientHeight;

      if (!width || !height) return;

      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gold = ctx.createLinearGradient(0, 0, width, height);
      gold.addColorStop(0, "#fff0b3");
      gold.addColorStop(0.25, "#d7ad45");
      gold.addColorStop(0.5, "#f9e7a0");
      gold.addColorStop(0.75, "#bd8d2b");
      gold.addColorStop(1, "#f4d778");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gold;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255, 255, 235, 0.9)";
      ctx.lineWidth = 2;
      ctx.strokeRect(8, 8, width - 16, height - 16);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#682638";

      ctx.font = "13px Georgia, serif";
      ctx.fillText("A LITTLE SURPRISE", width / 2, height / 2 - 26);

      ctx.font = "bold 23px Georgia, serif";
      ctx.fillText("Scratch to Reveal", width / 2, height / 2 + 3);

      ctx.font = "12px Georgia, serif";
      ctx.fillText(
        "✧ A golden moment awaits ✧",
        width / 2,
        height / 2 + 31
      );
    };

    drawCover();

    const observer = new ResizeObserver(drawCover);
    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  // Erase the gold coating as the visitor scratches.
  const scratch = useCallback((event) => {
    if (!scratchingRef.current || revealedRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, []);

  // Reveal the date and launch flowers.
  const revealCard = useCallback(() => {
    if (revealedRef.current) return;

    revealedRef.current = true;
    scratchingRef.current = false;
    setIsRevealed(true);

    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    const newFlowers = Array.from({ length: FLOWER_COUNT }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: `${rect.left + Math.random() * rect.width}px`,
      top: `${rect.top}px`,
      burstX: `${(Math.random() - 0.5) * 220}px`,
      fallX: `${(Math.random() - 0.5) * 300}px`,
      size: `${16 + Math.random() * 15}px`,
      duration: `${3 + Math.random() * 1.8}s`,
      delay: `${Math.random() * 0.65}s`,
      symbol: ["🌸", "🌼", "🌺", "✿", "❀"][
        Math.floor(Math.random() * 5)
      ],
    }));

    setFlowers(newFlowers);

    flowerTimerRef.current = window.setTimeout(() => {
      setFlowers([]);
    }, 5500);
  }, []);

  const checkScratchProgress = useCallback((force = false) => {
    if (revealedRef.current) return;

    const now = performance.now();
    if (!force && now - lastProgressCheckRef.current < 100) return;
    lastProgressCheckRef.current = now;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const step = 16;
    let transparent = 0;
    let sampled = 0;

    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        if (pixels[(y * canvas.width + x) * 4 + 3] < 100) transparent++;
        sampled++;
      }
    }

    if (sampled && (transparent / sampled) * 100 >= SCRATCH_THRESHOLD) {
      revealCard();
    }
  }, [revealCard]);

  // Start scratching.
  const handlePointerDown = (event) => {
    if (revealedRef.current) return;

    scratchingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratch(event);
  };

  // Continue scratching.
  const handlePointerMove = (event) => {
    scratch(event);
    checkScratchProgress();
  };

  const handlePointerUp = () => {
    if (!scratchingRef.current) return;

    scratchingRef.current = false;
    if (revealedRef.current) return;
    checkScratchProgress(true);
  };

  // Clean up the flower animation timer.
  useEffect(() => {
    return () => {
      if (flowerTimerRef.current) {
        window.clearTimeout(flowerTimerRef.current);
      }
    };
  }, []);

  // Allow visitors to reveal the date without scratching.
  const handleRevealClick = () => {
    revealCard();
  };

  return (
    <Reveal id="date">
      <p className="kicker">SAVE THE DATE</p>
      <h2 className="h2">Scratch to see our date</h2>

      <div className="scratch-wrap" ref={cardRef}>
        <div className="scratch-under">
          <span className="scratch-weekday">{wedding.weekday}</span>
          <span className="scratch-date">{wedding.dateLabel}</span>
          <span className="scratch-weekday">{wedding.muhurtham}</span>
        </div>

        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            aria-label="Scratch this gold surface to reveal the wedding date"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        )}
      </div>

      {!isRevealed && (
        <button
          type="button"
          className="btn-ghost"
          onClick={handleRevealClick}
        >
          Reveal the date
        </button>
      )}

      {flowers.map((flower) => (
        <span
          key={flower.id}
          className="scratch-flower"
          style={{
            left: flower.left,
            top: flower.top,
            "--burst-x": flower.burstX,
            "--fall-x": flower.fallX,
            "--flower-size": flower.size,
            "--flower-duration": flower.duration,
            "--flower-delay": flower.delay,
          }}
          aria-hidden="true"
        >
          {flower.symbol}
        </span>
      ))}
    </Reveal>
  );
};

export default ScratchCard;
