import { useEffect, useRef, useState } from 'react';

// Fades a section in once when it scrolls into view.
export default function Reveal({
  as: Wrapper = 'section',
  children,
  className = '',
  delay = 120,
  id,
  section = true,
}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Wrapper
      ref={ref}
      id={id}
      className={`${section ? 'section ' : ''}reveal ${seen ? 'in-view' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Wrapper>
  );
}
