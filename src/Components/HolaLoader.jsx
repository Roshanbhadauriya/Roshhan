import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HolaLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
    return () => clearInterval(interval);
  }, [onComplete]);

  // Calculate dynamic Y position based on progress
  // 260 is below the text, -40 is fully above the text
  const yPos = 260 - (300 * progress) / 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] select-none p-4 w-full">
      <div className="relative w-full max-w-[900px] h-[150px] md:h-[300px] flex items-center justify-center">
        
        <svg 
          className="w-full h-full" 
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

      <div className="w-full max-w-[320px] md:max-w-[550px] mt-2 text-right">
        <span className="text-black/40 font-mono text-xs uppercase tracking-widest font-semibold">
          loading... {progress}%
        </span>
      </div>
    </div>
  );
};

export default HolaLoader;
