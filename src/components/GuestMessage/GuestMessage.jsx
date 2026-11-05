import Reveal from '../Reveal.jsx';
import { wedding } from '../../data/weddingConfig.js';
import './GuestMessage.css';

export default function GuestMessage() {
  return (
    <Reveal className="guest-message">
      <h2 className="h2">Dear guests</h2>
      <p className="message">
        Your presence and blessings will make our new beginning complete. We look forward to celebrating with you.
      </p>
      <div className="rule" aria-hidden="true" />
      <p className="signature">With love, {wedding.bride} &amp; {wedding.groom}</p>
    </Reveal>
  );
}
