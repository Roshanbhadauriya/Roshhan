import React, { useEffect } from "react";
import { Link } from "react-router";
import { gadgetsData } from "../data/gadgets";
import { GadgetCard } from "../Sections/Gadgets";

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
          to="/#gadgets"
          aria-label="Back to gadgets"
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
          Loadout // {gadgetsData.length}
        </div>
      </nav>

      {/* Spacing Container — matches Gadgets section max-w-6xl */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto space-y-16">
        {gadgetsData.map((gadget) => (
          <GadgetCard key={gadget.id} gadget={gadget} />
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
