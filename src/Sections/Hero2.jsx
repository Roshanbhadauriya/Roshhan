import { motion } from 'framer-motion';
import ImageCollage from '../Components/ImageCollage';
import { intro } from "../data/index.js";

export default function Hero2() {
  return (
    <section className="px-6 py-12 md:px-12 lg:px-24 lg:py-20 w-full bg-brand-bg text-brand-text font-brand-sans antialiased">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Column: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-[0.2em] text-brand-accent uppercase">
              FULL STACK DEVELOPER
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {intro.greeting} {intro.name} - a full stack developer.
            </h1>
            <p className="text-lg md:text-xl text-brand-muted leading-relaxed max-w-xl">
              {intro.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={intro.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-8 py-3 bg-brand-button text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-sm cursor-pointer"
            >
              Resume
            </a>
            <a
              href={intro.calDotComLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-8 py-3 bg-transparent border-2 border-brand-button text-brand-button rounded-lg font-semibold hover:bg-brand-button hover:text-white transition-all cursor-pointer"
            >
              Book A Call
            </a>
          </div>
        </motion.div>

        {/* Right Column: Image Collage */}
        <div className="relative pt-12 lg:pt-0">
          <ImageCollage />
        </div>
      </div>
    </section>
  );
}
