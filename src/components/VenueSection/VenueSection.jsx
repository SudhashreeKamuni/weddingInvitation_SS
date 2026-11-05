import Reveal from '../Reveal';
import { wedding } from '../../data/weddingConfig';

export default function VenueSection() {
  const { name, address, mapEmbedUrl, mapsLink } = wedding.venue;

  return (
    <Reveal>
      <p className="kicker">VENUE</p>
      <h2 className="h2">{name}</h2>
      {address ? <p className="detail">{address}</p> : <p className="detail">Exact venue details coming soon.</p>}
      {mapEmbedUrl && (
        <div className="map-frame">
          <iframe title={`Map of ${name}`} src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      )}
      <a className="btn-primary" href={mapsLink} target="_blank" rel="noopener noreferrer">
        Open in Google Maps
      </a>
    </Reveal>
  );
}
