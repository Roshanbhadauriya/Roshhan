import { motion } from 'framer-motion';
import me1 from '../assets/Roshan.JPG';
import me2 from '../assets/me2.jpg';
import prize from '../assets/prize.JPG';

export default function ImageCollage() {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-square max-w-2xl mx-auto lg:mx-0">
      {/* Main Image (Podcast Studio) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
        animate={{ opacity: 1, scale: 1, rotate: 3 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 right-0 w-[75%] z-10"
      >
        <div className="relative group">
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

      {/* Surfing Image */}
      <motion.div 
        initial={{ opacity: 0, x: -40, rotate: -10 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[25%] left-0 w-[45%] z-20"
      >
        <div className="relative group">
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

      {/* Speaking/Event Image */}
      <motion.div 
        initial={{ opacity: 0, y: 40, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-[10%] md:bottom-[15%] right-[15%] w-[45%] z-30"
      >
        <div className="relative group">
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
