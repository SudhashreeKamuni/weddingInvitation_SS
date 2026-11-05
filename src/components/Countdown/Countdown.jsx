import { useEffect, useState } from 'react';
import Reveal from '../Reveal';
import { wedding } from '../../data/weddingConfig';

const target = new Date(wedding.targetISO).getTime();

function calc() {
  const diff = target - Date.now();
  if (diff <= 0) return { over: true, since: -diff };
  const s = Math.floor(diff / 1000);
  return {
    over: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown() {
  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <Reveal>
      <p className="kicker">COUNTING DOWN</p>
      <h2 className="h2">Until we say “I do”</h2>
      {t.over ? (
        <p className="message">
          {t.since < 6 * 3600 * 1000
            ? 'The celebration is happening now. Thank you for your blessings.'
            : 'Thank you for celebrating with us and for your blessings.'}
        </p>
      ) : (
        <div className="cd-grid" role="timer" aria-live="off">
          {[
            ['Days', t.days],
            ['Hours', t.hours],
            ['Minutes', t.minutes],
            ['Seconds', t.seconds],
          ].map(([label, value]) => (
            <div className="cd-box" key={label}>
              <span className="cd-num">{label === 'Days' ? value : pad(value)}</span>
              <span className="cd-label">{label}</span>
            </div>
          ))}
        </div>
      )}
    </Reveal>
  );
}
