import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const HolaLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState('');
  const [sysInfo, setSysInfo] = useState({
    screen: '...',
    platform: '...',
    network: '...',
    cores: '...',
    agent: '...'
  });

  useEffect(() => {
    // Initial system info fetch
    setSysInfo({
      screen: typeof window !== 'undefined' ? `${window.screen.width}X${window.screen.height}` : 'UNKNOWN',
      platform: typeof navigator !== 'undefined' ? (navigator.platform || 'UNKNOWN').toUpperCase() : 'UNKNOWN',
      network: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection.effectiveType.toUpperCase() : 'UNKNOWN',
      cores: typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 'N/A') : 'N/A',
      agent: typeof navigator !== 'undefined' ? navigator.userAgent.split(' ')[0] : ''
    });

    // Fast timer for ms-level time updates
    const timeInterval = setInterval(() => {
      const now = new Date();
      const pad = (n, m=2) => n.toString().padStart(m, '0');
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}:${pad(now.getMilliseconds(), 3)}`);
    }, 45);

    // Original fill loader
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(() => {
               onComplete();
            }, 600);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 45); // Speed of fill

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, [onComplete]);

  // Calculate dynamic Y position based on progress
  // 260 is below the text, -40 is fully above the text
  const yPos = 260 - (300 * progress) / 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] select-none p-4 w-full relative overflow-hidden">
      
      {/* HUD Style Distributed Info Panels */}
      <div className="absolute left-4 md:left-8 top-4 md:top-8 font-mono text-[9px] md:text-[11px] text-black/30 uppercase tracking-[0.2em] pointer-events-none flex items-center gap-3">
        <GlitchText delay={0.1} speed={15}>SYS.TIME</GlitchText>
        <span className="opacity-60">[{time}]</span>
      </div>

      <div className="absolute right-4 md:right-8 top-4 md:top-8 font-mono text-[9px] md:text-[11px] text-black/30 uppercase tracking-[0.2em] pointer-events-none flex items-center gap-3">
        <GlitchText delay={0.2} speed={15}>SYS.PLAT</GlitchText>
        <span className="opacity-60 flex">[<GlitchText delay={0.5} speed={10}>{sysInfo.platform}</GlitchText>]</span>
      </div>

      {/* <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 font-mono text-[9px] md:text-[11px] text-black/30 uppercase tracking-[0.2em] pointer-events-none flex items-center gap-3">
        <GlitchText delay={0.3} speed={15}>SYS.NET</GlitchText>
        <span className="opacity-60 flex">[<GlitchText delay={0.6} speed={10}>{sysInfo.network}</GlitchText>]</span>
      </div>

      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-mono text-[9px] md:text-[11px] text-black/30 uppercase tracking-[0.2em] pointer-events-none flex items-center gap-3">
        <GlitchText delay={0.4} speed={15}>SYS.CORE</GlitchText>
        <span className="opacity-60 flex">[<GlitchText delay={0.7} speed={10}>{sysInfo.cores}</GlitchText>]</span>
      </div> */}

      <div className="absolute left-4 md:left-8 bottom-4 md:bottom-8 font-mono text-[9px] md:text-[11px] text-black/30 uppercase tracking-[0.2em] pointer-events-none flex items-center gap-3">
        <GlitchText delay={0.5} speed={15}>SYS.RES</GlitchText>
        <span className="opacity-60 flex">[<GlitchText delay={0.8} speed={10}>{sysInfo.screen}</GlitchText>]</span>
      </div>

      <div className="relative w-full max-w-[900px] h-[150px] md:h-[300px] flex items-center justify-center">
        
        <svg 
          className="w-full h-full z-10" 
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* The SVG Mask shaped exactly like our text */}
            <clipPath id="textMask">
              <text 
                x="50%" 
                y="75%" 
                textAnchor="middle" 
                className="font-black tracking-tighter uppercase"
                style={{ fontSize: '240px', fontFamily: 'inherit' }}
              >
                HOLA
              </text>
            </clipPath>
          </defs>

          {/* Background Text Layer (Light Gray) */}
          <text 
            x="50%" 
            y="75%" 
            textAnchor="middle" 
            fill="#e5e5e5"
            className="font-black tracking-tighter uppercase"
            style={{ fontSize: '240px', fontFamily: 'inherit' }}
          >
            HOLA
          </text>

          {/* Foreground Water Layer, clipped to the text! */}
          <g clipPath="url(#textMask)">
             <motion.g
                initial={{ y: 260 }}
                animate={{ y: yPos }}
                transition={{ duration: 0.2, ease: "easeOut" }}
             >
                {/* The repeating curvy wave. 
                    M 0 30 Q 100 0, 200 30 T 400 30 gives a wave 400px wide. 
                    We repeat it enough to animate x from 0 to -400 seamlessly.
                */}
                <motion.path
                  animate={{ x: [0, -400] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  fill="#111111"
                  d="M 0 50 Q 100 10, 200 50 T 400 50 T 600 50 T 800 50 T 1000 50 T 1200 50 T 1600 50 L 1600 600 L 0 600 Z"
                />
             </motion.g>
          </g>
        </svg>

      </div>

      <div className="w-full max-w-[320px] md:max-w-[550px] mt-2 text-right z-10">
        <span className="text-black/40 font-mono text-xs uppercase tracking-widest font-semibold flex flex-col items-end">
          <span>loading... {progress}%</span>
          <div className="w-[100px] h-[2px] bg-[#e5e5e5] mt-1 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-black" style={{ width: `${progress}%` }} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default HolaLoader;
