import { useEffect, useRef, useState } from 'react';
import { wedding } from '../data/weddingConfig';

// Music starts only after the visitor taps "Tap to open" (a deliberate action).
export default function MusicToggle({ requestPlay, visible }) {
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!requestPlay) return;
    const a = audioRef.current;
    if (!a) return;

    a.volume = 0.08;
    a.play()
      .then(() => {
        fadeIntervalRef.current = window.setInterval(() => {
          a.volume = Math.min(1, a.volume + 0.02);
          if (a.volume >= 1) {
            window.clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }, 100);
      })
      .catch(() => setPlaying(false)); // browser may refuse; the button still works

    return () => {
      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };
  }, [requestPlay]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      if (fadeIntervalRef.current !== null) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }
    else a.play().catch(() => setFailed(true));
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.audioSrc}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      {visible && (
        <button
          type="button"
          className="music-btn"
          onClick={toggle}
          disabled={failed}
          aria-pressed={playing}
          aria-label={failed ? 'Music unavailable' : playing ? 'Pause music' : 'Play music'}
          title={failed ? 'Music file not found' : undefined}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      )}
    </>
  );
}
