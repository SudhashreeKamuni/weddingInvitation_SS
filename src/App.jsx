import { useState } from 'react';
import './App.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import TempleOpening from './components/TempleOpening/TempleOpening.jsx';
import InvitationCard from './components/InvitationCard/InvitationCard.jsx';
import ScratchCard from './components/ScratchCard/ScratchCard';
import Countdown from './components/Countdown/Countdown.jsx';
import WeddingTimeline from './components/WeddingTimeline/WeddingTimeline.jsx';
import PhotoCarousel from './components/PhotoCarousel/PhotoCarousel.jsx';
import VenueSection from './components/VenueSection/VenueSection.jsx';
import GuestMessage from './components/GuestMessage/GuestMessage.jsx';
import MusicToggle from './components/MusicToggle';

// Controls whether the remaining sections are displayed.
const SHOW_REST_OF_SITE = true;

export default function App() {
  const [stage, setStage] = useState('closed');
  const [musicRequested, setMusicRequested] = useState(false);

  const siteVisible = stage === 'revealing' || stage === 'open';

  return (
    <>
      <TempleOpening
        onStageChange={setStage}
        onTap={() => SHOW_REST_OF_SITE && setMusicRequested(true)}
      >
        <main className="site">
          <InvitationCard showScrollHint={SHOW_REST_OF_SITE} />

          {SHOW_REST_OF_SITE && (
            <>
              <ScratchCard />
              <Countdown />
              <WeddingTimeline />
              <PhotoCarousel />
              <VenueSection />
              <GuestMessage />
            </>
          )}
        </main>
      </TempleOpening>

      <MusicToggle
        requestPlay={musicRequested}
        visible={SHOW_REST_OF_SITE && siteVisible}
      />

      {/* Vercel monitoring */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}