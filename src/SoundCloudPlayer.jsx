import React, { useState } from 'react';
import ReactPlayer from 'react-player/soundcloud';

const tracks = [
  {
    url: 'https://soundcloud.com/bryanadams/heaven-classic-version?si=9947367221664ab3aa542c2ed97d60f8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
  },
  {
    url: 'https://soundcloud.com/bryanadams/summer-of-69-classic-version?si=904d18e78c1047829dd64e5fd89fad23&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
  },
  {
    url: 'https://soundcloud.com/atlanticrecords/christina-perri-a-thousand?si=9a45e17349de4018bb3ca4ad026b790a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
  },
  {
    url: 'https://soundcloud.com/edwards-music/swae-lee?si=535a7fcd919d4a669629cdd9920e9a1d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
  },
  {
    url: 'https://soundcloud.com/cigarettesaftersex/heavenly-1?in=cigarettesaftersex/sets/cry&si=cebf2c6b75054f8bbaa30ee5da6c7732&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
  },
  {
    url: 'https://soundcloud.com/aligatie/its-you?si=e7d6bb499d6f496b888af77d6cef198a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
  }
];

const SoundCloudPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{
      position: 'absolute',
      top: -1,
      left: 60,
      zIndex: 1000,
      background: 'transparent',
      padding: '0.5rem',
      borderRadius: '4px',
      boxShadow: '0 0 8px rgba(0,0,0,0.2)',
      marginBottom: '100px'
    }}>
      <ReactPlayer
        url={tracks[currentTrackIndex].url}
        controls
        playing
        width="100%"
        height="50px"
        onEnded={nextTrack} // 👉 Automatically play next track
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={prevTrack} style={{ marginRight: '1rem' }}>⏮️</button>
        <button onClick={nextTrack}>⏭️</button>
      </div>
    </div>
  );
};

export default SoundCloudPlayer;
