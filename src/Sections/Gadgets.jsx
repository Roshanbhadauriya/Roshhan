import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { gadgetsData } from "../data/gadgets";

const Gadgets = () => {
  return (
    <section id="gadgets" className="w-full pb-32 pt-10 px-6 md:px-12 lg:px-24 bg-[#272727] text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {gadgetsData.slice(0, 2).map((gadget) => (
          <motion.div 
            key={gadget.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`w-full flex flex-col-reverse md:flex-row bg-[#1c1c1c] rounded-2xl overflow-hidden mb-16 border border-white/5 md:h-[450px] group`}
          >
            {/* Context Column */}
            <div className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-brand-sans font-medium mb-3 tracking-tight">{gadget.title}</h3>
              <p className="text-[#a0a0a0] font-brand-sans text-sm md:text-base leading-relaxed mb-6 lg:mb-10 line-clamp-3 md:line-clamp-none whitespace-normal">{gadget.description}</p>
              
              <ul className="flex flex-col border-t border-white/10 mt-auto">
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
            
            <div className="w-full md:w-7/12 bg-[#252525] flex justify-center items-center overflow-hidden h-[300px] md:h-full">
               <div className="w-full h-full relative">
                 <img 
                   src={gadget.image} 
                   alt={gadget.title} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                   referrerPolicy="no-referrer"
                 />
                 {/* Subtle gradient overlay to blend with card if image is dark */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
               </div>
            </div>
          </motion.div>
        ))}

        {/* Action Link */}
        <div className="mt-8">
          <Link 
            to="/gadgets"
            className="px-8 py-3 border border-white/20 rounded-full font-mono text-sm uppercase tracking-widest hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-white block"
          >
            See All Gadgets &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Gadgets;
