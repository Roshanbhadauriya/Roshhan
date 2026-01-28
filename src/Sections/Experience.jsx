
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import marioRunAnimation from "../assets/lottie/Running.json";
import { experienceData } from "../data/experience";
import TimelineItem from "../Components/TimelineItem";

const Experience = () => {
  const containerRef = useRef(null);

  // Configuration for Month-Scale Layout
  const START_YEAR = 2024;
  const END_YEAR = 2026;
  const MONTHS_PER_YEAR = 12;
  const PX_PER_MONTH = 60; // 60px per month (Zoomed out scale)
  const INITIAL_PADDING = 300;
  const TOTAL_MONTHS = (END_YEAR - START_YEAR + 1) * MONTHS_PER_YEAR;

  // Helper: Parse date to month index (0 to TOTAL_MONTHS)
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
  
  // Calculate positions for all items to find the "Furthest" one for Mario's stop point
  // We need to know where the last item physically sits on this month-scale to stop Mario there.
  const itemPositions = experienceData.map(item => {
      const monthIdx = getMonthIndex(item.date);
      return INITIAL_PADDING + (monthIdx * PX_PER_MONTH);
  });
  const maxItemPos = Math.max(...itemPositions); // Mario stops at the furthest item

  // Animation constants
  const MARIO_DURATION = 5; // seconds
  const MARIO_DELAY = 0.5;

  // Generate Year Array for Background
  const years = [];
  for (let y = START_YEAR; y <= END_YEAR; y++) {
    years.push(y);
  }

  return (
    <section id="experience" className="relative w-full h-screen bg-background overflow-hidden flex flex-col justify-center">
        
        {/* Section Heading */}
        <div className="absolute top-20 left-0 w-full px-10 md:px-20 z-20 pointer-events-none">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Experience</h2>
            <div className="w-20 h-1 bg-primary rounded-full opacity-50" />
        </div>

        {/* Horizontal Scroll Container */}
        <div 
            ref={containerRef}
            className="w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar relative"
            style={{ 
                scrollBehavior: 'smooth',
                cursor: 'grab' 
            }}
        >
            <div 
                className="h-full relative flex items-center"
                style={{ 
                    // Width = Padding + (Total Months * Width) + End Padding
                    width: `${INITIAL_PADDING + (TOTAL_MONTHS * PX_PER_MONTH) + 500}px` 
                }}
            >
                
                {/* Main Horizontal Axis */}
                <div className="absolute left-0 right-0 h-[1px] bg-gray-300 top-1/2 transform -translate-y-1/2" />

                {/* Month Ticks (Using Scale) */}
                {Array.from({ length: TOTAL_MONTHS }).map((_, globalMonthIdx) => {
                    const tickPos = INITIAL_PADDING + (globalMonthIdx * PX_PER_MONTH);
                    const isYearStart = globalMonthIdx % 12 === 0;

                    // Animation Interaction Logic
                    // Only animate if the tick is "before" or "at" the finish line (maxItemPos)
                    const shouldAnimate = tickPos <= maxItemPos;
                    // Progress ratio derived from Mario's path (0 to maxItemPos)
                    // Note: Mario effectively travels from 0 to maxItemPos.
                    const progress = tickPos / maxItemPos;
                    const animDelay = MARIO_DELAY + (progress * MARIO_DURATION);

                    return shouldAnimate ? (
                         <motion.div 
                            key={`tick-${globalMonthIdx}`}
                            initial={{ backgroundColor: isYearStart ? "#9ca3af" : "#d1d5db" }} // gray-400 or gray-300
                            whileInView={{ backgroundColor: "#60a5fa" }} // blue-400 on active
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
                                ${isYearStart ? 'w-3 h-3 bg-gray-400' : 'w-1 h-1 bg-gray-300'}
                            `}
                            style={{ left: `${tickPos}px` }}
                        />
                    );
                })}

                {/* Background Years */}
                {years.map((year, index) => {
                    const yearStartMonth = (year - START_YEAR) * 12;
                    // Center of the year = Start Month Pixel + (6 Months * Width)
                    const centerPx = INITIAL_PADDING + (yearStartMonth * PX_PER_MONTH) + (6 * PX_PER_MONTH);
                    const isAbove = index % 2 === 0;

                    return (
                        <div 
                            key={year}
                            className={`absolute font-bold pointer-events-none select-none z-0 flex justify-center items-center text-foreground/5`}
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


                {/* Timeline Items - Positioned by Month */}
                {experienceData.map((item, index) => {
                    const monthIdx = getMonthIndex(item.date);
                    if (monthIdx < 0) return null;
                    const leftPos = INITIAL_PADDING + (monthIdx * PX_PER_MONTH);

                    // Animation Delay for dots
                    const progress = leftPos / maxItemPos;
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
                        initial={{ left: '0px' }} 
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

            </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground z-20 pointer-events-none">
            Current: Frontend Developer &bull; Innovquant Solutions Pvt Ltd
        </div>
    </section>
  );
};

export default Experience;
