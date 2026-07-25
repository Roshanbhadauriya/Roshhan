import React, { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { projectsData } from "../data/projects";

const AllProjects = () => {

  // Force scroll jump to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#272727] text-[#F4F4F4] font-brand-sans selection:bg-brand-accent selection:text-[#272727]">
      
      {/* Absolute Header Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-8 md:px-12 lg:px-24 flex items-center justify-between z-50 mix-blend-difference">
        <Link 
          to="/#projects" 
          aria-label="Back to projects"
          className="group inline-flex items-center py-2 text-white hover:opacity-70 transition-opacity"
        >
          <svg 
            className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 ease-out group-hover:-translate-x-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
        </Link>
        <div className="text-xs uppercase tracking-widest font-mono opacity-50">
          Archive // {projectsData.length}
        </div>
      </nav>

      {/* Spacing Container */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-32 md:space-y-48">
        
        {/* Render Same Grid Stack statically */}
        {projectsData.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                      <span 
                        key={tag}
                        className="px-4 py-1.5 md:px-5 md:py-2 border border-white/30 rounded-full whitespace-nowrap hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-2 md:ml-4 font-mono">{project.year}</span>
                  </div>
                </div>

                {/* Showcase Image Container */}
                <div className="w-full relative overflow-hidden bg-black/20 aspect-[16/10] md:aspect-[21/9]">
                  <img 
                    src={project.image} 
                    alt={`${project.title} showcase`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>
            </motion.div>
          ))}

      </section>

      {/* Simple Footer Callout */}
      <footer className="w-full py-20 flex justify-center items-center opacity-40 font-mono text-xs uppercase tracking-widest">
        End of Showcase
      </footer>
    </main>
  );
};

export default AllProjects;
