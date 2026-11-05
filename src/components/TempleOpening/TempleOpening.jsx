import { useEffect, useState } from 'react';
import { wedding } from '../../data/weddingConfig';
import './TempleOpening.css';
import { ARCH_MASK } from '../archMask';

/* ---------- Easy settings ---------- */
export const OPENING = {
  doorsImage: '/temple-doors.webp', // full temple picture (no text)
  frameImage: '/temple-frame.webp', // same picture with the door arch cut out
  fadeMs: 1800, // text fades away slowly
  doorMs: 3000, // doors sliding apart
  blankMs: 600, // dark pause (keep 400-700)
  ease: 'cubic-bezier(0.65, 0.05, 0.25, 1)',
};

// Fixed values (no Math.random) so petals look the same on every render.
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 23 + 9) % 96,
  size: 9 + (i % 4) * 3,
  delay: (i * 1.1) % 8,
  dur: 7 + (i % 5) * 1.4,
  drift: ((i % 7) - 3) * 22,
}));

/*
  Stages: closed -> fading -> opening -> blank -> revealing -> open
  Every stage moves on when the real animation ends (onAnimationEnd).
  The only timer is the intentional dark pause in "blank".
*/
export default function TempleOpening({ children, onTap, onStageChange }) {
  const [stage, setStage] = useState('closed');
  const [leftDone, setLeftDone] = useState(false);
  const [rightDone, setRightDone] = useState(false);
  const [doorsOk, setDoorsOk] = useState(true);
  const [frameOk, setFrameOk] = useState(true);

  // Check both images exist, so a wrong file name is easy to diagnose.
  useEffect(() => {
    const check = (src, onFail) => {
      const img = new Image();
      img.onerror = () => {
        console.error(
          `[TempleOpening] Could not load "${src}". Put it in public/images/ and check the exact file name (spelling, hyphen, capital letters).`
        );
        onFail();
      };
      img.src = src;
    };
    check(OPENING.doorsImage, () => setDoorsOk(false));
    check(OPENING.frameImage, () => setFrameOk(false));
  }, []);

  useEffect(() => {
    onStageChange?.(stage);
  }, [stage, onStageChange]);

  // Both doors finished -> dark pause
  useEffect(() => {
    if (stage === 'opening' && leftDone && rightDone) setStage('blank');
  }, [stage, leftDone, rightDone]);

  // Intentional pause, then show the invitation
  useEffect(() => {
    if (stage !== 'blank') return undefined;
    const t = setTimeout(() => setStage('revealing'), OPENING.blankMs);
    return () => clearTimeout(t);
  }, [stage]);

  const handleTap = () => {
    if (stage !== 'closed') return; // ignore repeated taps
    onTap?.();
    setStage('fading');
  };

  const handleTextEnd = (e) => {
    if (e.target !== e.currentTarget || e.animationName !== 'coverTextFade') return;
    if (stage === 'fading') setStage('opening');
  };

  const handleDoorEnd = (side) => (e) => {
    const name = side === 'left' ? 'doorOpenLeft' : 'doorOpenRight';
    if (e.target !== e.currentTarget || e.animationName !== name) return;
    if (stage !== 'opening') return;
    if (side === 'left') setLeftDone(true);
    else setRightDone(true);
  };

  const handleSiteEnd = (e) => {
    if (e.target !== e.currentTarget || e.animationName !== 'siteReveal') return;
    if (stage === 'revealing') setStage('open');
  };

  const replay = () => {
    setLeftDone(false);
    setRightDone(false);
    setStage('closed');
    window.scrollTo(0, 0);
  };

  const showStage = ['closed', 'fading', 'opening', 'blank'].includes(stage);
  const showSite = stage === 'revealing' || stage === 'open';
  const go = stage === 'opening' || stage === 'blank';

  const vars = {
    '--fade-ms': `${OPENING.fadeMs}ms`,
    '--door-ms': `${OPENING.doorMs}ms`,
    '--blank-ms': `${OPENING.blankMs}ms`,
    '--ease': OPENING.ease,
  };
  const doorsBg = { backgroundImage: `url(${OPENING.doorsImage})` };
  // If temple-frame.webp is missing, reuse the doors picture with an arch-shaped hole.
  const frameBg = frameOk
    ? { backgroundImage: `url(${OPENING.frameImage})` }
    : {
        backgroundImage: `url(${OPENING.doorsImage})`,
        WebkitMaskImage: `url(${ARCH_MASK})`,
        maskImage: `url(${ARCH_MASK})`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
      };

  return (
    <div style={vars}>
      {showStage && (
        <div className={`temple-stage st-${stage}`}>
          <div className="stage-box">
            <div className={`art${doorsOk ? '' : ' no-art'}`}>
              {/* 1. warm light inside the temple (seen when doors open) */}
              <div className={`interior${go ? ' go' : ''}`}>
                <div className="cv-rays" />
              </div>

              {/* 2. the two doors: same picture, left half and right half */}
              <div
                className={`door door-left${go ? ' go' : ''}`}
                style={doorsBg}
                onAnimationEnd={handleDoorEnd('left')}
              />
              <div
                className={`door door-right${go ? ' go' : ''}`}
                style={doorsBg}
                onAnimationEnd={handleDoorEnd('right')}
              />

              {/* 3. temple pillars + arch (door area is transparent) */}
              <div className="frame" style={frameBg} />

              {/* 4. text, fades away first */}
              <div
                className={`cover-text${stage !== 'closed' ? ' fade-out' : ''}`}
                onAnimationEnd={handleTextEnd}
              >
                <p className="ct cv-kicker">WITH LOVE AND BLESSINGS</p>

                <div className="ct cv-orn" style={{ top: '28.7%' }} aria-hidden="true">
                  <i />
                  <Lotus />
                  <i />
                </div>

                <h1 className="ct cv-title">
                  Wedding
                  <br />
                  Invitation
                </h1>

                <div className="ct cv-names">
                  <span>{wedding.bride}</span>
                  <span className="cv-amp">
                    <i />
                    &amp;
                    <i />
                  </span>
                  <span>{wedding.groom}</span>
                </div>

                <div className="ct cv-orn" style={{ top: '60.9%' }} aria-hidden="true">
                  <i />
                  <Lotus />
                  <i />
                </div>

                <p className="ct cv-tagline">Two hearts, one beautiful journey</p>

                <button
                  type="button"
                  className="ct open-btn"
                  onClick={handleTap}
                  disabled={stage !== 'closed'}
                >
                  Open Invitation
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 7h19M14 1l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* falling petals */}
            <div className="petals" aria-hidden="true">
              {PETALS.map((p, i) => (
                <span
                  key={i}
                  className="petal"
                  style={{
                    left: `${p.left}%`,
                    width: p.size,
                    height: p.size * 1.3,
                    '--d': `${p.dur}s`,
                    '--delay': `${p.delay}s`,
                    '--drift': `${p.drift}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {showSite && (
        <div
          className={`site-wrap ${stage === 'revealing' ? 'is-revealing' : 'is-open'}`}
          onAnimationEnd={handleSiteEnd}
        >
          {children}
        </div>
      )}

      {import.meta.env.DEV && stage === 'open' && (
        <button type="button" className="replay-btn" onClick={replay}>
          Replay opening
        </button>
      )}
    </div>
  );
}

function Lotus() {
  return (
    <svg className="cv-lotus" viewBox="0 0 40 24" fill="currentColor" aria-hidden="true">
      <path d="M20 2C16 8 16 15 20 22C24 15 24 8 20 2Z" />
      <path d="M20 22C13 21 8 16 5 9C12 9 17 13 20 22Z" opacity=".85" />
      <path d="M20 22C27 21 32 16 35 9C28 9 23 13 20 22Z" opacity=".85" />
    </svg>
  );
}

































