import React, { useEffect, useRef, useState } from 'react';

const tracks = [
    {
      title: 'The New Dawn',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      title: 'Dreamers of Dreams',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      title: 'Winds of Destiny',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      title: 'Sunlight Path',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
      title: 'After the Rain',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
    {
      title: 'Road Trip Memories',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    {
      title: 'Flowing Through Time',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    },
    {
      title: 'Midnight Sky',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
    {
      title: 'The River\'s Tale',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    },
    {
      title: 'Echoes in the Valley',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    },
    {
      title: 'Waking Dreams',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    },
    {
      title: 'The Traveler\'s Heart',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    },
  ];
  
const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const playOnInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.warn('Playback failed:', err));
      }
      document.removeEventListener('click', playOnInteraction);
    };

    // Many browsers require interaction before autoplay. We simulate that here.
    document.addEventListener('click', playOnInteraction);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Load new source
      audioRef.current.play().catch((err) => console.warn('Playback failed:', err));
    }
  }, [currentTrackIndex]);

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ position: 'Absolute', top: 30, left: 60, zIndex: 1000, background: 'transparent', padding: '0.5rem', borderRadius: '4px', boxShadow: '0 0 8px rgba(0,0,0,0.2)' }}>
      <p style={{ margin: 0, fontSize: 15 }}><strong>Now Playing:</strong> {tracks[currentTrackIndex].title}</p>
      <button onClick={prevTrack}>⏮️</button>
      <button onClick={nextTrack}>⏭️</button>
      <audio ref={audioRef} loop>
        <source src={tracks[currentTrackIndex].src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
