import Header from "../Components/Header.jsx"
import Intro from "../Sections/Intro.jsx"
import Projects from "../Sections/Projects.jsx"
const Layout = () =>{


  return(
    <>
      <div className="bg-[#f9f9f9]">
          <Header/>
<Intro />
        <Projects/>
      </div>
    </>
  )

}


export default Layout
