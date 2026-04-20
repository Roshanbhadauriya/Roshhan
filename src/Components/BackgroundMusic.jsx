import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from '../assets/bg.mp3';

const BAR_COUNT = 4;

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  // Try to autoplay; if blocked, wait for first user click anywhere
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;

    const tryPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);

      }).catch(() => {
        // Autoplay blocked — set up interaction listeners
        const attemptPlay = (e) => {
          audio.play().then(() => {
            setIsPlaying(true);
            document.removeEventListener('click', attemptPlay);
            document.removeEventListener('touchstart', attemptPlay);
            document.removeEventListener('keydown', attemptPlay);
            document.removeEventListener('mousemove', attemptPlay);
          }).catch(() => {
            // If the browser blocks play on mouse movement, remove the mousemove
            // listener to avoid spamming errors, but keep the click listener active.
            if (e && e.type === 'mousemove') {
              document.removeEventListener('mousemove', attemptPlay);
            }
          });
        };
        
        document.addEventListener('click', attemptPlay);
        document.addEventListener('touchstart', attemptPlay);
        document.addEventListener('keydown', attemptPlay);
        document.addEventListener('mousemove', attemptPlay);
      });
    };

    // Small delay to let the page settle after loader exit animation
    const timeout = setTimeout(tryPlay, 800);
    return () => clearTimeout(timeout);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <>
      <audio 
        ref={audioRef} 
        src={bgMusic} 
        preload="auto" 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating mute/unmute button — bottom-right */}
      <motion.button
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: 'easeOut' }}
        aria-label={isPlaying ? 'Mute background music' : 'Unmute background music'}
        title={isPlaying ? 'Mute' : 'Unmute'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(17,17,17,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          padding: 0,
          outline: 'none',
          boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          borderColor: 'rgba(255,255,255,0.35)',
          boxShadow: '0 0 20px rgba(255,255,255,0.08)',
        }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              style={{
                position: 'absolute',
                whiteSpace: 'nowrap',
                background: 'rgba(17,17,17,0.9)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.05em',
                pointerEvents: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {isPlaying ? 'PAUSE AUDIO' : 'PLAY AUDIO'}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: '8px',
                  height: '8px',
                  background: 'rgba(17,17,17,0.9)',
                  borderRight: '1px solid rgba(255,255,255,0.1)',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Animated sound bars */}
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <motion.span
            key={i}
            style={{
              display: 'inline-block',
              width: '3px',
              borderRadius: '2px',
              background: isPlaying ? '#fff' : 'rgba(255,255,255,0.35)',
            }}
            animate={
              isPlaying
                ? {
                    height: ['4px', `${10 + i * 3}px`, '6px', `${12 + (BAR_COUNT - i) * 2}px`, '4px'],
                  }
                : { height: '4px' }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8 + i * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;
