import React, { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { gadgetsData } from "../data/gadgets";

const AllGadgets = () => {

  // Force scroll jump to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#272727] text-[#F4F4F4] font-brand-sans selection:bg-brand-accent selection:text-[#272727]">
      
      {/* Absolute Header Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-8 md:px-12 lg:px-24 flex items-center justify-between z-50 mix-blend-difference">
        <Link 
          to="/" 
          className="text-xs md:text-sm font-mono uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <span>&larr;</span> Back to Home
        </Link>
        <div className="text-xs uppercase tracking-widest font-mono opacity-50">
          Loadout // {gadgetsData.length}
        </div>
      </nav>

      {/* Spacing Container */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto space-y-16">
        
        {gadgetsData.map((gadget) => (
          <motion.div 
            key={gadget.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`w-full flex flex-col-reverse md:flex-row bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl border border-white/5`}
          >
            {/* Context Column */}
            <div className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-brand-sans font-medium mb-3 tracking-tight">{gadget.title}</h3>
              <p className="text-[#a0a0a0] font-brand-sans text-sm md:text-base leading-relaxed mb-10">{gadget.description}</p>
              
              <ul className="flex flex-col border-t border-white/10">
                {gadget.links.map((link, i) => (
                  <li key={i} className="border-b border-white/10">
                    <a 
                      href={link.url}
                      className="block py-4 text-sm font-medium text-[#d4d4d4] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Image Showcase Box */}
            <div className="w-full md:w-7/12 bg-[#252525] p-12 md:p-20 flex justify-center items-center">
               <img 
                 src={gadget.image} 
                 alt={gadget.title} 
                 className="w-full max-h-[350px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                 referrerPolicy="no-referrer"
               />
            </div>
          </motion.div>
        ))}

      </section>

      {/* Simple Footer Callout */}
      <footer className="w-full py-20 flex justify-center items-center opacity-40 font-mono text-xs uppercase tracking-widest">
        End of Inventory
      </footer>
    </main>
  );
};

export default AllGadgets;
