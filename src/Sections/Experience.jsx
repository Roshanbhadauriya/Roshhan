import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lottie from "lottie-react";
import marioRunAnimation from "../assets/lottie/Running.json";
import { experienceData } from "../data/experience";
import TimelineItem from "../Components/TimelineItem";

const Experience = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Match Tailwind md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Configuration for Month-Scale Layout
  const START_YEAR = 2024;
  const END_YEAR = 2026;
  const MONTHS_PER_YEAR = 12;
  const PX_PER_MONTH = 60; // 60px per month (Zoomed out scale)
  const INITIAL_PADDING = 300;
  const TOTAL_MONTHS = (END_YEAR - START_YEAR + 1) * MONTHS_PER_YEAR;

  // Helper: Parse date to month index (0 to TOTAL_MONTHS relative to START_YEAR)
  const getMonthIndex = (dateStr) => {
     const monthsMap = {
         "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
         "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
     };

     // Matches: "Nov 2024", "2024", "Jun 2024"
     const match = dateStr.match(/([a-zA-Z]{3})\s(\d{4})/) || dateStr.match(/(\d{4})/);
     
     if (!match) return 0;

     let year, month;
     
     if (match.length === 3) {
         // Found "Month YYYY"
         month = monthsMap[match[1]] || 0;
         year = parseInt(match[2]);
     } else {
         // Found just "YYYY"
         year = parseInt(match[1]);
         month = 0; // Default to Jan
     }

     const yearDiff = year - START_YEAR;
     return (yearDiff * 12) + month;
  };
  
  // Find where the earliest experience starts to trim empty space
  const rawMonthIndices = experienceData.map(item => getMonthIndex(item.date));
  const timelineStartMonthIdx = rawMonthIndices.length > 0 ? Math.min(...rawMonthIndices) : 0;
  
  // Calculate relative positions for all items with the new shifted axis
  const itemPositions = experienceData.map(item => {
      const axisIdx = getMonthIndex(item.date) - timelineStartMonthIdx;
      return INITIAL_PADDING + (axisIdx * PX_PER_MONTH);
  });
  
  // Need to know where the last item sits
  const maxItemPos = itemPositions.length > 0 ? Math.max(...itemPositions) : INITIAL_PADDING + 100;
  
  // Base timeline line starts exactly at the first node
  const minLinePos = INITIAL_PADDING; 

  // Animation constants
  const MARIO_DURATION = 5; // seconds
  const MARIO_DELAY = 0.5;

  // Generate Year Array for Background
  const years = [];
  for (let y = START_YEAR; y <= END_YEAR; y++) {
    years.push(y);
  }
  
  const displayedMonthsCount = TOTAL_MONTHS - timelineStartMonthIdx;

  const { scrollYProgress } = useScroll({ 
      target: containerRef,
      offset: ["start 60%", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, { 
      stiffness: 70, 
      damping: 20, 
      mass: 0.2,
      restDelta: 0.001 
  });
  
  // Use matching string templates so Framer Motion can properly tween the internal numbers!
  const x = useTransform(smoothProgress, [0, 1], ["calc(0% + 0vw)", "calc(-100% + 100vw)"]);

  return (
    <div ref={containerRef} className="relative md:h-[400vh] h-auto bg-brand-bg font-brand-sans">
      <section id="experience" className="md:sticky md:top-0 w-full md:h-screen h-[100dvh] overflow-hidden flex flex-col justify-center">
        
        {/* Section Heading */}
        <div className="absolute top-20 left-0 w-full px-10 md:px-20 z-20 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4 tracking-tight">Experience</h2>
            <div className="w-20 h-1 bg-brand-accent rounded-full opacity-50" />
        </div>

        {/* Translation Container */}
        <div className="w-full h-full relative overflow-x-auto scrollbar-hide py-10 md:py-0">
            <motion.div 
                className="h-full relative flex items-center"
                style={{ 
                    // Width = Padding + Remaining Months + End Padding
                    width: `${INITIAL_PADDING + (displayedMonthsCount * PX_PER_MONTH) + 500}px`,
                    x: isMobile ? 0 : x
                }}
            >
                
                {/* Main Horizontal Axis: Starts explicitly at the very first element's dot */}
                <div 
                  className="absolute right-0 h-[1px] bg-gray-300 top-1/2 transform -translate-y-1/2" 
                  style={{ left: `${minLinePos}px` }}
                />

                {/* Month Ticks (Using Scale) - Iterates from the start month index */}
                {Array.from({ length: displayedMonthsCount }).map((_, idx) => {
                    const globalMonthIdx = timelineStartMonthIdx + idx;
                    const tickPos = INITIAL_PADDING + (idx * PX_PER_MONTH);
                    const isYearStart = globalMonthIdx % 12 === 0;

                    // Animation Interaction Logic
                    const shouldAnimate = tickPos <= maxItemPos;
                    // Progress ratio derived from Mario's path (traveling from minLinePos to maxItemPos)
                    const travelDistance = maxItemPos - minLinePos;
                    const progress = travelDistance > 0 ? (tickPos - minLinePos) / travelDistance : 0;
                    const animDelay = MARIO_DELAY + (progress * MARIO_DURATION);

                    return shouldAnimate ? (
                         <motion.div 
                            key={`tick-${globalMonthIdx}`}
                            initial={{ backgroundColor: isYearStart ? "#b2a896" : "#dfdbd2" }}
                            whileInView={{ backgroundColor: "#5d5343" }} 
                            viewport={{ once: true }}
                            transition={{ delay: animDelay, duration: 0.1 }}
                            className={`absolute rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2
                                ${isYearStart ? 'w-3 h-3' : 'w-1 h-1'}
                            `}
                            style={{ left: `${tickPos}px` }}
                        />
                    ) : (
                         <div 
                            key={`tick-${globalMonthIdx}`}
                            className={`absolute rounded-full top-1/2 transform -translate-y-1/2 -translate-x-1/2
                                ${isYearStart ? 'w-3 h-3 bg-brand-accent/50' : 'w-1 h-1 bg-[#dfdbd2]'}
                            `}
                            style={{ left: `${tickPos}px` }}
                        />
                    );
                })}

                {/* Background Years */}
                {years.map((year, index) => {
                    const yearStartMonth = (year - START_YEAR) * 12;
                    const axisIdx = yearStartMonth - timelineStartMonthIdx;
                    // Only render year if it's reasonably in bounds frame
                    if (axisIdx < -12) return null; 
                    
                    const centerPx = INITIAL_PADDING + (axisIdx * PX_PER_MONTH) + (6 * PX_PER_MONTH);
                    const isAbove = index % 2 === 0;

                    return (
                        <div 
                            key={year}
                            className={`absolute font-bold pointer-events-none select-none z-0 flex justify-center items-center text-brand-text/[0.03]`}
                            style={{ 
                                left: `${centerPx}px`,
                                top: '50%',
                                fontSize: '10rem', 
                                width: '1000px', 
                                transform: `translate(-50%, ${isAbove ? '-85%' : '-15%'})`, 
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {year}
                        </div>
                    );
                })}

                {/* Timeline Items - Positioned by relative Month axis */}
                {experienceData.map((item, index) => {
                    const axisIdx = getMonthIndex(item.date) - timelineStartMonthIdx;
                    if (axisIdx < 0) return null;
                    
                    const leftPos = INITIAL_PADDING + (axisIdx * PX_PER_MONTH);

                    // Animation Delay for specific experience dot reveal
                    const travelDistance = maxItemPos - minLinePos;
                    const progress = travelDistance > 0 ? (leftPos - minLinePos) / travelDistance : 0;
                    const animDelay = MARIO_DELAY + (progress * MARIO_DURATION);
                    
                    return (
                        <div 
                            key={item.id} 
                            className="absolute top-1/2"
                            style={{ left: `${leftPos}px` }}
                        >
                            <TimelineItem item={item} index={index} animDelay={animDelay} />
                        </div>
                    );
                })}

                {/* Mario Runner Animation */}
                {experienceData.length > 0 && (
                    <motion.div
                        className="absolute top-1/2 z-20 pointer-events-none"
                        initial={{ left: `${minLinePos}px` }} 
                        whileInView={{ 
                            left: `${maxItemPos}px` 
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: MARIO_DURATION, 
                            ease: "linear",
                            delay: MARIO_DELAY 
                        }}
                        style={{ 
                            transform: 'translate(-50%, -82%)', 
                            width: '100px', 
                            height: '100px'
                        }}
                    >
                        <Lottie animationData={marioRunAnimation} loop={true} />
                    </motion.div>
                )}

            </motion.div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-brand-muted z-20 pointer-events-none">
            Current: Frontend Developer &bull; Zeroteq Software Pvt Ltd
        </div>
      </section>
    </div>
  );
};

export default Experience;
