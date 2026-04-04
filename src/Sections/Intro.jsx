import { Section , Box, AspectRatio } from "@radix-ui/themes";
import {intro} from "../data/index.js"
import {Fade} from "../Components/ReactReveal.jsx"
import { Button } from "../Components/ui/Button.jsx"
import emoji from "react-easy-emoji";
import SocialHandles from "../Components/SocialHandles.jsx";
import TechStack from "../Components/TechStack.jsx"

const Intro = () => {
  const heroImgStyle = {
    WebkitAnimation: "rosh 8s ease-in-out infinite",
    animation: "rosh 8s ease-in-out infinite",
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    border: "3px solid #2d2e32",
    borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
    height  :"70%",
    width :"70%",
    AspectRatio :1/1,
    maxHeight: "35rem",
    position: "relative",
    transition: "all 1s ease-in-out",
    maxWidth: "35rem",
    backgroundImage: `url("/DSC00129.jpg")`,
  };

  return (
    <>
      <Fade duration={1000} triggerOnce>
        <Section className="mb-20 bg-[#f9f9f9]  flex items-center justify-between px-20 pt-20 max-[600px]:px-2 max-[320px]:flex-col md:flex-row ">
          <div className="flex flex-1 flex-col">
            <Fade duration={2000} triggerOnce direction="down">
              <h1 className="py-4 text-4xl max-[600px]:text-3xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
                {intro.greeting + " "}
                <span className="text-blue-400">{intro.name}</span>
                <span className="inline-block animate-wave">{emoji("👋")}</span>
              </h1>
            </Fade>
<Fade duration={2000} triggerOnce>
              <p className="text-xl max-[600px]:text-md tracking-tight sm:text-3xl sm:leading-[40px]">
                {intro.description}
              </p>


            <TechStack />

</Fade>
            <Fade duration={2000} triggerOnce direction="up">
                <SocialHandles />
              <div className="mt-10 flex flex-col gap-5 min-[320px]:flex-row min-[320px]:items-center">
              <Button
                variant="primary"
                size="lg"
                className="uppercase"
                href={intro.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </Button>
               <Button
                variant="call"
                size="lg"
                className="uppercase"
                href={intro.calDotComLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book A Call
              </Button>
            </div>
            </Fade>
          </div>
          <div className="flex h-[800px] max-[768px]:hidden flex-1 justify-end items-center">
            <div style={heroImgStyle}></div>
          </div>
        </Section>
      </Fade>
    </>
  );
};


export default Intro
