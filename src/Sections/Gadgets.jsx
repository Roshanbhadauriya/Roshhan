import React, { useRef, useEffect } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gadgetsData } from "../data/gadgets";

gsap.registerPlugin(ScrollTrigger);

const GadgetCard = ({ gadget }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const links = linksRef.current;
    if (!card || !text || !image || !links) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 1. Card fades in with subtle scale
    tl.fromTo(
      card,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // 2. Text content slides in from left
    tl.fromTo(
      text,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.3"
    );

    // 3. Image reveals with clip-path from right
    tl.fromTo(
      image,
      { clipPath: "inset(0 0 0 100%)" },
      {
        clipPath: "inset(0 0 0 0%)",
        duration: 1,
        ease: "power4.inOut",
      },
      "-=0.5"
    );

    // 4. Link items stagger in with line-draw effect
    const linkEls = links.querySelectorAll("[data-link-item]");
    tl.fromTo(
      linkEls,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === card) st.kill();
      });
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full flex flex-col-reverse md:flex-row bg-[#1c1c1c] rounded-2xl overflow-hidden mb-16 border border-white/5 md:h-[450px] group"
      style={{ opacity: 0 }}
    >
      {/* Context Column */}
      <div ref={textRef} className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl font-brand-sans font-medium mb-3 tracking-tight">
          {gadget.title}
        </h3>
        <p className="text-[#a0a0a0] font-brand-sans text-sm md:text-base leading-relaxed mb-6 lg:mb-10 line-clamp-3 md:line-clamp-none whitespace-normal">
          {gadget.description}
        </p>

        <ul ref={linksRef} className="flex flex-col border-t border-white/10 mt-auto">
          {gadget.links.map((link, i) => (
            <li key={i} data-link-item className="border-b border-white/10">
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

      {/* Image Column */}
      <div
        ref={imageRef}
        className="w-full md:w-7/12 bg-[#252525] flex justify-center items-center overflow-hidden h-[300px] md:h-full"
        style={{ clipPath: "inset(0 0 0 100%)" }}
      >
        <div className="w-full h-full relative">
          <img
            src={gadget.image}
            alt={gadget.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const Gadgets = () => {
  const headingRef = useRef(null);

  return (
    <section id="gadgets" className="w-full pb-32 pt-10 px-6 md:px-12 lg:px-24 bg-[#272727] text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {gadgetsData.slice(0, 2).map((gadget) => (
          <GadgetCard key={gadget.id} gadget={gadget} />
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
