import Header from "../Components/Header.jsx"
import Experience from "../Sections/Experience.jsx"
import Intro from "../Sections/Intro.jsx"
import Hero2 from "../Sections/Hero2.jsx"
import Header2 from "../Components/Header2.jsx"
import Projects from "../Sections/Projects.jsx"
import Gadgets from "../Sections/Gadgets.jsx"

const Layout = () =>{


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
    </>
  )

}


export default Layout
