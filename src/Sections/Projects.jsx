import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router";
import { projectsData } from "../data/projects";

const Projects = () => {
  const containerRef = useRef(null);

  // Track the scroll of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start fading when top of section crosses vertically middle of screen
    offset: ["start 60%", "end end"] 
  });
  
  // Smooth out the progress for color tweening so it doesn't judder
  const smoothColorProgress = useSpring(scrollYProgress, {
    stiffness: 50, damping: 25, mass: 0.5, restDelta: 0.001
  });

  // Interpolate Background off-white -> deep charcoal grey matching screenshots. 
  // [0, 0.4] stretches the transition across 40% of the scroll instead of 20%
  const bgColor = useTransform(smoothColorProgress, [0, 0.4], ["#fcfbf7", "#272727"]);
  
  // Interpolate Text dark -> stark white
  const textColor = useTransform(smoothColorProgress, [0, 0.4], ["#2c2924", "#F4F4F4"]);
  
  // Interpolate Border colors for the pill tags
  const borderColor = useTransform(smoothColorProgress, [0, 0.4], ["rgba(44, 41, 36, 0.2)", "rgba(244, 244, 244, 0.4)"]);

  return (
    <motion.section 
      id="projects"
      ref={containerRef}
      style={{ backgroundColor: bgColor, color: textColor }}
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 font-brand-sans transition-colors duration-100 ease-out"
    >
      <div className="max-w-7xl mx-auto space-y-40">
        
        {projectsData.map((project, idx) => {
          // Simple reveal animation parameter per project
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col group"
            >
              
              <a 
                href={project.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col group cursor-pointer"
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-12">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight uppercase group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 md:mt-0 text-[10px] md:text-xs tracking-wider uppercase font-semibold">
                    {project.tags.map(tag => (
                      <motion.span 
                        key={tag}
                        style={{ borderColor }}
                        className="px-4 py-1.5 md:px-5 md:py-2 border rounded-full whitespace-nowrap hover:bg-brand-text/5 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {tag}
                      </motion.span>
                    ))}
                    <span className="ml-2 md:ml-4 font-mono">{project.year}</span>
                  </div>
                </div>

              {/* Showcase Image Container */}
              <div className="w-full relative overflow-hidden bg-black/5 aspect-[16/10] md:aspect-[21/9]">
                <img 
                  src={project.image} 
                  alt={`${project.title} showcase`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              </a>
            </motion.div>
          );
        })}

        {/* Show More Projects Anchor */}
        <div className="w-full flex justify-center pt-10">
          <Link 
            to="/projects"
            style={{ color: textColor, borderColor }}
            className="px-8 py-3 border border-white/20 rounded-full font-mono text-sm uppercase tracking-widest hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            Show All Projects &rarr;
          </Link>
        </div>

      </div>
    </motion.section>
  );
};

export default Projects;
