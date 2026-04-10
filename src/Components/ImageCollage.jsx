import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import me1 from '../assets/Roshan.JPG';
import me2 from '../assets/me2.jpg';
import prize from '../assets/prize.JPG';

export default function ImageCollage({ startDelay = 2.0 }) {
  const containerRef = useRef(null);
  const imgRefs = [useRef(null), useRef(null), useRef(null)];

  const photoVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: 0 },
    animate: (custom) => ({
      opacity: 1,
      scale: 1,
      rotate: custom.rotate,
      transition: {
        delay: startDelay + custom.index * 0.15,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const intensities = [50, 35, 20]; // Matching the requested intensities

    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imgRefs.forEach((ref, index) => {
        if (ref.current) {
          gsap.to(ref.current, {
            x: x * intensities[index],
            y: y * intensities[index],
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      imgRefs.forEach((ref) => {
        if (ref.current) {
          gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-[4/3] md:aspect-square max-w-2xl mx-auto lg:mx-0 cursor-default">
      {/* Main Image (Podcast Studio) - Intensity 50 */}
      <motion.div 
        variants={photoVariants}
        custom={{ index: 0, rotate: 3 }}
        initial="initial"
        animate="animate"
        className="absolute top-0 right-0 w-[75%] z-10"
      >
        <div ref={imgRefs[0]} className="relative group will-change-transform">
          <img 
            src={me2} 
            alt="Main photo" 
            className="rounded-2xl shadow-2xl border-4 border-white w-full aspect-[4/3] object-cover"
          />
          <span className="absolute -top-8 right-4 font-handwriting text-brand-handwriting text-xl md:text-2xl rotate-3 whitespace-nowrap">
            Yo! 
          </span>
        </div>
      </motion.div>

      {/* Surfing Image - Intensity 35 */}
      <motion.div 
        variants={photoVariants}
        custom={{ index: 1, rotate: -6 }}
        initial="initial"
        animate="animate"
        className="absolute top-[25%] left-0 w-[45%] z-20"
      >
        <div ref={imgRefs[1]} className="relative group will-change-transform">
          <img 
            src={prize} 
            alt="Prize photo" 
            className="rounded-xl shadow-xl border-4 border-white w-full aspect-square object-cover"
          />
          <span className="absolute -bottom-10 left-2 font-handwriting text-brand-handwriting text-xl md:text-2xl -rotate-3 whitespace-nowrap">
            who dis?
          </span>
        </div>
      </motion.div>

      {/* Speaking/Event Image - Intensity 20 */}
      <motion.div 
        variants={photoVariants}
        custom={{ index: 2, rotate: 3 }}
        initial="initial"
        animate="animate"
        className="absolute bottom-[10%] md:bottom-[15%] right-[15%] w-[45%] z-30"
      >
        <div ref={imgRefs[2]} className="relative group will-change-transform">
          <img 
            src={me1} 
            alt="Secondary photo" 
            className="rounded-xl shadow-xl border-4 border-white w-full aspect-[4/3] object-cover"
          />
          <span className="absolute -bottom-10 right-0 font-handwriting text-brand-handwriting text-xl md:text-2xl rotate-2 whitespace-nowrap">
            ...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
