import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  isSearchOpen,
  setIsSearchOpen,
  onSelectCategory
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-12 py-3 flex items-center justify-between ${
        isScrolled
          ? 'bg-[#080808]/95 backdrop-blur-md shadow-lg shadow-black/80 border-b border-white/5'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent'
      }`}
    >
      <div className="flex items-center space-x-6">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 rounded-lg bg-[#E50914] flex items-center justify-center font-black text-2xl text-white shadow-md shadow-[#E50914]/40 group-hover:scale-105 transition-transform">
            P
          </div>
          <span className="font-extrabold text-xl md:text-2xl tracking-wider text-white font-mono">
            PIKOORA
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
          <button onClick={() => onSelectCategory('all')} className="hover:text-white transition-colors cursor-pointer">
            Home
          </button>
          <button onClick={() => onSelectCategory('cat-abc')} className="hover:text-white transition-colors cursor-pointer">
            ABC
          </button>
          <button onClick={() => onSelectCategory('cat-numbers')} className="hover:text-white transition-colors cursor-pointer">
            Numbers
          </button>
          <button onClick={() => onSelectCategory('cat-poems')} className="hover:text-white transition-colors cursor-pointer">
            Rhymes
          </button>
          <button onClick={() => onSelectCategory('cat-stories')} className="hover:text-white transition-colors cursor-pointer">
            Stories
          </button>
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        {isSearchOpen ? (
          <div className="flex items-center bg-[#181818] border border-white/20 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all focus-within:border-[#E50914]">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
            />
            <button
              onClick={() => {
                setSearchTerm('');
                setIsSearchOpen(false);
              }}
              className="text-gray-400 hover:text-white ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}