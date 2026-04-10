import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import me2 from "../assets/me2.jpg"; // Placeholder — user will replace later

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
          className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-16 md:py-20"
        >
          <p
            data-reveal
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#a09a8e] mb-6 opacity-0"
          >
            About Roshan
          </p>

          <h2
            data-reveal
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-snug opacity-0"
          >
            Builder. Developer. Explorer.
          </h2>

          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed text-[#a0a0a0] mb-4 max-w-lg opacity-0"
          >
            Roshan is an India-based full stack developer with 1+ years of experience
            building products across AI and finance. When not shipping code, he's exploring
            new tech, experimenting with side projects, and pushing pixels.
          </p>

          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed text-[#a0a0a0] mb-8 max-w-lg opacity-0"
          >
            Currently working as a Frontend Developer at Zeroteq Software Pvt Ltd.
            Available for projects, collaborations, and experiments.
          </p>

          {/* CTA */}
          <div data-reveal className="mb-10 opacity-0">
            <a
              href="https://cal.com/roshhan"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={scramble}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-mono uppercase tracking-widest text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              {ctaText} <span>→</span>
            </a>
          </div>

          {/* Social Icons */}
          <div data-reveal className="flex items-center gap-5 opacity-0">
            {socials.map((social, i) => (
              <a
                key={social.name}
                ref={(el) => (socialRefs.current[i] = el)}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-[#a0a0a0] hover:text-white transition-colors duration-300 text-lg block"
              >
                <social.Icon />
              </a>
            ))}
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
