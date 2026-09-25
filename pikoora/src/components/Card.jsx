import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';

export default function Card({ item, onPlay }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onPlay(item)}
      className="group relative flex-shrink-0 w-[200px] sm:w-[240px] md:w-[260px] bg-[#181818] rounded-lg overflow-hidden cursor-pointer border border-white/5 shadow-md"
    >
      <div className="relative aspect-video w-full bg-[#111111] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#E50914] flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-lg">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>

        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-semibold text-gray-200">
          Age {item.age}
        </div>

        <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] text-gray-300">
          <Clock className="w-3 h-3 text-gray-400" />
          <span>{item.duration}</span>
        </div>
      </div>

      <div className="p-3 bg-[#181818]">
        <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#E50914] transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {item.category}
        </p>
      </div>
    </motion.div>
  );
}