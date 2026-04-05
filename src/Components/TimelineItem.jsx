
import React from "react";
import { motion } from "framer-motion";

const TimelineItem = ({ item, index, animDelay = 0 }) => {
  const isTop = index % 2 === 0;
  
  // Heights for the connector lines
  const heights = [60, 120, 90, 150, 70, 130];
  const height = heights[index % heights.length];

  return (
    // The root div is positioned exactly on the central axis by the parent.
    // It has no height, acting as the anchor point (0,0).
    <div className="absolute w-[1px] h-0 pointer-events-auto group">
      
      {/* 1. The Vertical Line Connector */}
      {/* Extends from the anchor point (y=0) outwards */}
      <div 
        className="absolute w-[1px] bg-[#dfdbd2] group-hover:bg-brand-accent transition-colors duration-300"
        style={{
            height: `${height}px`,
            // If top, line goes UP from anchor (bottom: 0). 
            // If bottom, line goes DOWN from anchor (top: 0).
            [isTop ? 'bottom' : 'top']: '0', 
            left: '50%',
            transform: 'translateX(-50%)' 
        }}
      />

      {/* 2. The Content Container (Dot + Text) */}
      <div
        className="absolute flex items-center gap-2 min-w-[200px]"
        style={{
            // Position at the end of the line
            [isTop ? 'bottom' : 'top']: `${height}px`,
            left: '0', 
            // Center the dot horizontally on the line
            transform: isTop ? 'translate(-6px, 50%)' : 'translate(-6px, -50%)' 
        }}
      >
          {/* The Dot - Animated */}
          <motion.div 
            initial={{ backgroundColor: "#dfdbd2" }}
            whileInView={{ backgroundColor: item.type === 'project' ? '#b2a896' : '#5d5343' }}
            viewport={{ once: true }}
            transition={{ delay: animDelay, duration: 0.3 }}
            className={`w-3 h-3 rounded-full flex-none z-10 
              border border-brand-bg ring-2 ring-transparent group-hover:ring-brand-accent/20 transition-all`}
          />

          {/* The Text Card */}
          <div className={`flex flex-col ${isTop ? 'mb-2' : 'mt-2'}`}>
             <span className="text-[10px] text-brand-muted font-mono tracking-wider">{item.date}</span>
             <a 
                href={item.link} 
                onClick={(e) => {
                  if (item.link === '#') {
                    e.preventDefault();
                  }
                }}
                className="text-sm font-bold text-brand-text hover:text-brand-accent transition-colors whitespace-normal leading-tight block w-full text-left"
            >
                {item.title}
             </a>
             <span className="text-[10px] text-brand-muted mt-0.5">{item.org}</span>
          </div>
      </div>
    </div>
  );
};

export default TimelineItem;
