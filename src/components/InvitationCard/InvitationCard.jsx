import { wedding } from '../../data/weddingConfig';
import Reveal from '../Reveal.jsx';
import './InvitationCard.css';

export default function InvitationCard() {
  return (
    <Reveal as="div" className="invite-screen" delay={0} section={false}>
      <article className="section invite-card" aria-label="Wedding invitation">
        <div className="invite-card__content">
          <p className="kicker">WITH LOVE AND BLESSINGS</p>
          <div className="rule" aria-hidden="true" />
          <h1 className="names">
            <span className="name-group">
              <span className="family-line">Eldest daughter of Kamuni Supriya &amp; Sudhakar</span>
              <span>{wedding.bride}</span>
            </span>
            <em>&amp;</em>
            <span className="name-group">
              <span className="family-line">Son of Gorintla Sandhya &amp; Prabhakar</span>
              <span>{wedding.groom}</span>
            </span>
          </h1>
          <div className="rule" aria-hidden="true" />
          <p className="sub-title">Wedding Ceremony</p>
          <p className="message">
            With joy in our hearts, we invite you to celebrate and bless the union of{' '}
            {wedding.bride} and {wedding.groom}.
          </p>
        </div>
      </article>

      <a className="scroll-hint" href="#date" aria-label="Scroll down to the next section">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </Reveal>
  );
}
