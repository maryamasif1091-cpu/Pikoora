import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info } from 'lucide-react';

export default function Hero({ slides, onPlayVideo }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length, currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[75vh] md:h-[82vh] bg-[#080808] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent w-full md:w-3/4" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 md:px-12 flex flex-col justify-end pb-16 md:pb-20">
        <motion.div
          key={`content-${currentSlide.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl space-y-3"
        >
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-300">
            <span className="bg-[#E50914] text-white px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
              {currentSlide.category}
            </span>
            <span>•</span>
            <span>Ages {currentSlide.age}</span>
            <span>•</span>
            <span>{currentSlide.duration}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {currentSlide.title}
          </h1>

          <p className="text-sm md:text-base text-gray-300 line-clamp-3 leading-relaxed">
            {currentSlide.description}
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => onPlayVideo(currentSlide)}
              className="flex items-center space-x-2 bg-[#E50914] hover:bg-[#ff0f1a] text-white px-6 py-3 rounded-md font-bold text-sm md:text-base transition-transform hover:scale-105 shadow-lg shadow-[#E50914]/30 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Watch Now</span>
            </button>

            <button
              onClick={() => onPlayVideo(currentSlide)}
              className="flex items-center space-x-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-5 py-3 rounded-md font-semibold text-sm md:text-base transition-all backdrop-blur-sm cursor-pointer"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </motion.div>

        {/* 5 Dots Indicator */}
        <div className="absolute bottom-6 left-4 md:left-12 flex items-center space-x-2.5 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="p-1 cursor-pointer"
            >
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-7 bg-[#E50914]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}