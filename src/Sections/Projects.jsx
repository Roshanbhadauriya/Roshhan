import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const tags = tagsRef.current;
    if (!card || !image || !title || !tags) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 1. Image clip-path wipe reveal (left to right)
    tl.fromTo(
      image,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
      }
    );

    // 2. Title slides up with a mask feel
    tl.fromTo(
      title,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.8" // overlap with image reveal
    );

    // 3. Tags stagger in
    const tagEls = tags.querySelectorAll("[data-tag]");
    tl.fromTo(
      tagEls,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08,
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === card) st.kill();
      });
    };
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col group">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col group cursor-pointer"
      >
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 lg:mb-12">
          <h3
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight uppercase group-hover:-translate-y-1 transition-transform duration-500 ease-out"
          >
            {project.title}
          </h3>

          <div
            ref={tagsRef}
            className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 md:mt-0 text-[10px] md:text-xs tracking-wider uppercase font-semibold"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                data-tag
                className="px-4 py-1.5 md:px-5 md:py-2 border border-current/20 rounded-full whitespace-nowrap hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
            <span data-tag className="ml-2 md:ml-4 font-mono">
              {project.year}
            </span>
          </div>
        </div>

        {/* Showcase Image Container */}
        <div
          ref={imageRef}
          className="w-full relative overflow-hidden bg-black/5 aspect-[16/9] md:aspect-[21/9]"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <img
            src={project.image}
            alt={`${project.title} showcase`}
            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
      </a>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);

  // Track the scroll of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "start 80%"],
  });

  const smoothColorProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    mass: 0.3,
    restDelta: 0.001,
  });

  const bgColor = useTransform(smoothColorProgress, [0, 1], ["#fcfbf7", "#272727"]);
  const textColor = useTransform(smoothColorProgress, [0, 1], ["#2c2924", "#F4F4F4"]);

  return (
    <motion.section
      id="projects"
      ref={containerRef}
      style={{ backgroundColor: bgColor, color: textColor }}
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 font-brand-sans transition-colors duration-100 ease-out"
    >
      <div className="max-w-7xl mx-auto space-y-40">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* Show More Projects Anchor */}
        <div className="w-full flex justify-center pt-10">
          <Link
            to="/projects"
            style={{ color: textColor }}
            className="px-8 py-3 border border-current/20 rounded-full font-mono text-sm uppercase tracking-widest hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            Show All Projects &rarr;
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
