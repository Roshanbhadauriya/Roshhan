import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import ImageCollage from '../Components/ImageCollage';
import { intro } from "../data/index.js";

const ScrambleText = ({ text, delay = 0, duration = 0.8 }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!@#$%^&*()_+[]{};:,.<>?";

  useEffect(() => {
    let timeout;
    let interval;

    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += text.length / (duration * 20); // Adjust speed
      }, 50);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, duration]);

  return <span>{displayText || " "}</span>;
};

export default function Hero2() {
  const headlineWords = `${intro.greeting} ${intro.name} - a full stack developer.`.split(" ");

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 1.0,
      },
    },
  };

  const wordVariants = {
    initial: { 
      opacity: 0, 
      y: 20, 
      rotateX: 90,
      transformPerspective: 1000 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    },
  };

  return (
    <section className="px-6 py-12 md:px-12 lg:px-24 lg:py-20 w-full bg-brand-bg text-brand-text font-brand-sans antialiased overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Column: Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="relative inline-block">
              <p className="text-xs font-bold tracking-[0.2em] text-brand-accent uppercase">
                <ScrambleText text="FULL STACK DEVELOPER" delay={0} duration={0.8} />
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5, ease: "easeInOut" }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-accent origin-left"
              />
            </div>
            
            <motion.h1 
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-2"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="text-lg md:text-xl text-brand-muted leading-relaxed max-w-xl"
            >
              {intro.description}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              href={intro.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-8 py-3 bg-brand-button text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-sm cursor-pointer"
            >
              Resume
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.02, duration: 0.6 }} // 1.9 + 0.12 = 2.02
              href={intro.calDotComLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-8 py-3 bg-transparent border-2 border-brand-button text-brand-button rounded-lg font-semibold hover:bg-brand-button hover:text-white transition-all cursor-pointer"
            >
              Book A Call
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Image Collage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.8, ease: "easeOut" }}
          className="relative pt-12 lg:pt-0"
        >
          <ImageCollage startDelay={2.1} />
        </motion.div>
      </div>
    </section>
  );
}

