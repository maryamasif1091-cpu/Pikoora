import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './Card';

export default function Category({ title, items, onPlayVideo, id }) {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id={id} className="py-6 relative group/section">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide inline-block relative px-4">
          {title}
          <div className="h-1 w-12 bg-[#E50914] mx-auto mt-1 rounded-full" />
        </h2>
      </div>

      <div className="relative px-4 md:px-12">
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-[#E50914] hover:border-[#E50914] shadow-xl cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
        >
          {items.map((item) => (
            <Card key={item.id} item={item} onPlay={onPlayVideo} />
          ))}
        </div>

        <button
          onClick={() => handleScroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-[#E50914] hover:border-[#E50914] shadow-xl cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}