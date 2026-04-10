import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Header from "../Components/Header.jsx"
import Experience from "../Sections/Experience.jsx"
import Intro from "../Sections/Intro.jsx"
import Hero2 from "../Sections/Hero2.jsx"
import Header2 from "../Components/Header2.jsx"
import Projects from "../Sections/Projects.jsx"
import Gadgets from "../Sections/Gadgets.jsx"
import Footer from "../Components/Footer.jsx"

const Layout = () =>{
  const location = useLocation();
  const [showArrow, setShowArrow] = useState(false);

  // Scroll to hash section when navigating back from subpages
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Show/hide arrow based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return(
    <>
      <div className="bg-[#f9f9f9]">
          {/* <Header/> */}
          {/* <Intro /> */}

          <Header2 />
          <Hero2 />
          <Experience />
          <Projects />
          <Gadgets />
          <Footer />
      </div>

      {/* Available for Work Badge */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-2 bg-[#1c1c1c]/80 backdrop-blur-md border border-white/10 rounded-full shadow-xl pointer-events-none sm:pointer-events-auto group hover:bg-[#1c1c1c] transition-all duration-300">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F4F4]/90 group-hover:text-white transition-colors">
          Available for work
        </span>
      </div>

      {/* Scroll to Top Arrow */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[#1c1c1c]/80 backdrop-blur-md border border-white/10 shadow-xl text-white/70 hover:text-white hover:bg-[#1c1c1c] transition-all duration-300 cursor-pointer ${
          showArrow 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </>
  )

}


export default Layout
