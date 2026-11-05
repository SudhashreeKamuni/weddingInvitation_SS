import { wedding } from "../../data/weddingConfig";
import "./WeddingTimeline.css";
import Reveal from "../Reveal.jsx";

function WeddingTimeline() {
  return (
    <Reveal
      id="wedding-timeline"
      as="section"
      className="wedding-timeline"
      delay={160}
      section={false}
    >
      <header className="timeline-heading">
        <span className="timeline-eyebrow">
          SAVE THE MOMENTS
        </span>

        <h2>Wedding Timeline</h2>

        <p>Three celebrations. One beautiful story.</p>
      </header>

      <div className="timeline-list">
        {wedding.events.map((event, index) => (
          <Reveal
            as="article"
            className={`event-card image-${index % 2 === 0 ? "left" : "right"}`}
            key={event.title}
            delay={index * 180}
            section={false}
          >
            {/* Image placeholder: replace with your photo later */}
            <div className="event-image">
              {event.image ? (
                <img src={event.image} alt={event.title} />
              ) : (
                <div className="event-image-placeholder">
                  <span className="placeholder-symbol">✧</span>
                  <span>{event.title} Photo</span>
                  <small>Image coming soon</small>
                </div>
              )}
            </div>

            <div className="event-content">
              <span className="event-number">
                0{index + 1} / CELEBRATION
              </span>

              <h3>{event.title}</h3>

              <p className="event-subtitle">
                {event.subtitle}
              </p>

              <div className="event-separator">
                <span>✦</span>
              </div>

              <div className="event-info">
                <span className="event-info-icon" aria-hidden="true">
                  ◷
                </span>

                <div>
                  <span className="event-info-label">DATE</span>
                  <p>{event.date}</p>
                </div>
              </div>

              <div className="event-info">
                <span className="event-info-icon" aria-hidden="true">
                  ◴
                </span>

                <div>
                  <span className="event-info-label">TIME</span>
                  <p>{event.time}</p>
                </div>
              </div>

              <div className="event-info">
                <span className="event-info-icon" aria-hidden="true">
                  ⌖
                </span>

                <div>
                  <span className="event-info-label">LOCATION</span>
                  <p>{event.venue}</p>
                </div>
              </div>

              {event.mapsUrl ? (
                <a
                  className="event-map-button"
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OPEN MAP <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="event-map-pending">
                  Location details coming soon
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <footer className="timeline-footer">
        We look forward to celebrating these special moments with you.
      </footer>
    </Reveal>
  );
}

export default WeddingTimeline;
