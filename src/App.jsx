import { useState } from 'react';
import './App.css';
import TempleOpening from './components/TempleOpening/TempleOpening.jsx';
import InvitationCard from './components/InvitationCard/InvitationCard.jsx';
import ScratchCard from './components/ScratchCard/ScratchCard';
import Countdown from './components/Countdown/Countdown.jsx';
import WeddingTimeline from './components/WeddingTimeline/WeddingTimeline.jsx';
import PhotoCarousel from './components/PhotoCarousel/PhotoCarousel.jsx';
import VenueSection from './components/VenueSection/VenueSection.jsx';
import GuestMessage from './components/GuestMessage/GuestMessage.jsx';
import MusicToggle from './components/MusicToggle';

// STEP 1: keep this false and test only the opening + invitation card.
// STEP 2: change to true to show every other section and the music button.
const SHOW_REST_OF_SITE = true;

export default function App() {
  const [stage, setStage] = useState('closed');
  const [musicRequested, setMusicRequested] = useState(false);

  const siteVisible = stage === 'revealing' || stage === 'open';


  console.log("Current stage:", stage);
console.log("Site visible:", siteVisible);


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
    </>
  );
}
