import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import me2 from "../assets/me2.jpg"; // Placeholder — user will replace later
import DevHeatmap from "./DevHeatmap";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const socialRefs = useRef([]);
  const ctaRef = useRef(null);
  const [isScrambling, setIsScrambling] = useState(false);
  const [ctaText, setCtaText] = useState("Let's Talk");

  // Magnetic Effect
  useEffect(() => {
    socialRefs.current.forEach((el) => {
      if (!el) return;
      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power2.out" });
      };
      const handleMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  // Custom Scramble Effect
  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    const original = "Let's Talk";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
    let iterations = 0;
    
    const interval = setInterval(() => {
      setCtaText(
        original
          .split("")
          .map((letter, index) => {
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iterations >= original.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iterations += 1/3;
    }, 30);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut" }
      );

      tl.fromTo(
        textRef.current?.querySelectorAll("[data-reveal]"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 },
        "-=0.6"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { name: "GitHub", href: "https://github.com/roshanbhadauriya", Icon: FaGithub },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/roshanbhadauriya/", Icon: FaLinkedin },
    { name: "Twitter", href: "https://twitter.com/roshan_twi", Icon: FaTwitter },
    { name: "LeetCode", href: "https://leetcode.com/Roshan_DSA/", Icon: SiLeetcode },
    { name: "Codeforces", href: "https://codeforces.com/profile/roshanbhadoriya178", Icon: SiCodeforces },
    { name: "Email", href: "mailto:roshanbhadoriya178@gmail.com", Icon: FaEnvelope },
  ];

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#1c1c1c] text-[#e0ddd5] font-brand-sans"
    >
      {/* Main Split Section */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[65vh]">
        
        {/* Left: Image */}
        <div
          ref={imageRef}
          className="w-full md:w-1/2 h-[280px] md:h-auto relative overflow-hidden"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <img
            src={me2}
            alt="Roshan Bhadauriya"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: About Content */}
        <div
          ref={textRef}
          className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-12 lg:px-16 py-10 md:py-8 overflow-visible"
        >
          <p
            data-reveal
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#a09a8e] mb-3 opacity-0"
          >
            About Roshan
          </p>

          <h2
            data-reveal
            className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3 leading-snug opacity-0"
          >
            Builder. Developer. Explorer.
          </h2>

          <p
            data-reveal
            className="text-xs md:text-sm leading-relaxed text-[#a0a0a0] mb-2 max-w-lg opacity-0"
          >
            Roshan is an India-based full stack developer with 1+ years of experience
            building products across AI and finance. When not shipping code, he's exploring
            new tech, experimenting with side projects, and pushing pixels.
          </p>

          <p
            data-reveal
            className="text-xs md:text-sm leading-relaxed text-[#a0a0a0] mb-5 max-w-lg opacity-0"
          >
            Currently taking a health break to focus on physical well-being.
            Available for future collaborations and experiments.
          </p>

          {/* CTA */}
          <div data-reveal className="mb-5 opacity-0">
            <a
              href="https://cal.com/roshhan"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={scramble}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              {ctaText} <span>→</span>
            </a>
          </div>

          {/* Social Icons */}
          <div data-reveal className="flex items-center gap-3 opacity-0 mb-5">
            {socials.map((social, i) => (
              <div key={social.name} className="relative group">
                <a
                  ref={(el) => (socialRefs.current[i] = el)}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-[#a0a0a0] hover:text-white transition-all duration-300 text-lg p-2 rounded-full hover:bg-white/10 hover:scale-110 flex items-center justify-center block"
                >
                  <social.Icon />
                </a>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#252525] border border-white/15 rounded-md text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {social.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#252525]" />
                </div>
              </div>
            ))}
          </div>

          {/* Developer Activity Heatmap */}
          <div data-reveal className="opacity-0 w-full">
            <DevHeatmap />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-white/5 px-10 md:px-16 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#555]">
          © {new Date().getFullYear()} Roshan Bhadauriya. All rights reserved.
        </p>
        <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#555]">
          Designed & Built with ☕ from India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
