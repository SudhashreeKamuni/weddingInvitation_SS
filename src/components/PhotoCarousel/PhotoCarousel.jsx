import { useRef, useState } from 'react';
import Reveal from '../Reveal.jsx';
import { wedding } from '../../data/weddingConfig.js';

export default function PhotoCarousel() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const photos = wedding.photos;

  const go = (dir) => {
    const t = trackRef.current;
    if (t) t.scrollBy({ left: dir * t.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const t = trackRef.current;
    if (t) setIndex(Math.round(t.scrollLeft / t.clientWidth));
  };

  return (
    <Reveal>
      <p className="kicker">OUR MOMENTS</p>
      <h2 className="h2">The two of us</h2>
      <div className="carousel">
        <div className="car-track" ref={trackRef} onScroll={onScroll} tabIndex={0} aria-label="Photo carousel, swipe or use the arrows">
          {photos.map((p, i) => (
            <figure className="car-slide" key={i}>
              {p.src ? (
                <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
              ) : (
                <div className="car-placeholder" role="img" aria-label={`${p.alt} (placeholder)`}>
                  <span>Your photo {i + 1}</span>
                </div>
              )}
            </figure>
          ))}
        </div>
        <button type="button" className="car-btn prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
        <button type="button" className="car-btn next" onClick={() => go(1)} aria-label="Next photo">›</button>
      </div>
      <div className="dots" aria-hidden="true">
        {photos.map((_, i) => (
          <span key={i} className={i === index ? 'on' : ''} />
        ))}
      </div>
    </Reveal>
  );
}
