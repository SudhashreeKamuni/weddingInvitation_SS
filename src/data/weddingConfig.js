// =====================================================================
//  ALL WEDDING DETAILS LIVE IN THIS ONE FILE.
//  To change a date, venue, map link, event or photo, edit it here.
//  Every section of the website reads from this file.
// =====================================================================

// ---- 1. WEDDING DATE AND TIME ---------------------------------------
// Change only this line. Format: YYYY-MM-DDTHH:MM:SS+05:30 (India time, 24-hour clock)
// The date text, the weekday, the Muhurtham time and the countdown are all worked out from it.
const WEDDING_START = '2026-11-25T12:21:00+05:30';

const start = new Date(WEDDING_START);
const india = { timeZone: 'Asia/Kolkata' };
const dateLabel = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', ...india });
const weekday = start.toLocaleDateString('en-US', { weekday: 'long', ...india });
const muhurtham = start
  .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', ...india })
  .replace(/\u202f/g, ' ');

// ---- 2. WEDDING VENUE -----------------------------------------------
const venue = {
  name: 'Siddipet',
  address: 'Dudi MallaReddy Function Hall, Hanuman Nagar, Siddipet', // TODO: full venue address when you have it
  mapQuery: 'Siddipet, Telangana', // used for the map button until you add the address
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!4v1793858048407!6m8!1m7!1s3-IfMb2tzZraIsakIYOQDQ!2m2!1d18.10000388084638!2d78.83880597816047!3f288.5440760414862!4f-6.779073529823435!5f0.7820865974627469', // TODO: Google Maps > Share > Embed a map > paste the src="..." link here
};
const venueMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  venue.address || venue.mapQuery
)}`;

export const wedding = {
  // ---- 0. THE COUPLE (bride first) ----
  bride: 'Sathwika',
  groom: 'SaiKumar',

  // ---- worked out from section 1 (do not edit) ----
  targetISO: WEDDING_START,
  dateLabel,
  weekday,
  muhurtham,

  venue: { ...venue, mapsLink: venueMapsLink },

  // ---- 3. THE CELEBRATIONS (shown in the timeline) ----
  // image: file inside the public/ folder.  mapsUrl: any Google Maps link, or '' if not ready.
  events: [
    {
      title: 'Wedding',
      subtitle: 'Two hearts, one beautiful journey',
      date: dateLabel, // follows section 1
      time: muhurtham, // follows section 1
      venue: venue.address || venue.mapQuery, // follows section 2
      image: '/weddingImg.jpg',
      mapsUrl: venueMapsLink, // follows section 2
    },
    {
      title: 'Reception',
      subtitle: 'An evening of love and celebration',
      date: '26 November 2026', // TODO: confirm (same day as the wedding?)
      time: '7:00 PM',
      venue: "Groom's Home",
      image: '/receptionImg.png',
      mapsUrl:
        'https://www.google.com/maps/place/Madanapuram+-+kothakota/@16.3808366,77.8895503,15.28z/data=!4m6!3m5!1s0x3bc9f700223f9ad9:0xaf2b4db372591f74!8m2!3d16.3808495!4d77.9024611!16s%2Fg%2F11xf2hbthx?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D',
    },
  ],

  // ---- 4. COUPLE PHOTOS (carousel). Put files in public/images/ and set src, e.g. '/images/couple-1.jpg' ----
  photos: [
    { src: 'brideGroomImg.jpeg', alt: 'Sathwika and SaiKumar, photo 1' },
    { src: 'brideGroomImg.jpeg', alt: 'Sathwika and SaiKumar, photo 2' },
    { src: 'brideGroomImg.jpeg', alt: 'Sathwika and SaiKumar, photo 3' },
  ],

  // ---- 5. BACKGROUND MUSIC (file inside public/audio/) ----
  audioSrc: '/audio/wedding-instrumental.mpeg',
};
