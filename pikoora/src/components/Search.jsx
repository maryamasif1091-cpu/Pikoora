import React from 'react';
import Card from './Card';
import { SearchX } from 'lucide-react';

export default function Search({ searchTerm, results, onPlayVideo }) {
  return (
    <section className="px-4 md:px-12 py-8 min-h-[50vh]">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Search Results for <span className="text-[#E50914]">"{searchTerm}"</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Found {results.length} educational video{results.length === 1 ? '' : 's'}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {results.map((item) => (
            <Card key={item.id} item={item} onPlay={onPlayVideo} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="p-4 rounded-full bg-white/5 text-gray-400">
            <SearchX className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-white">No videos found</h3>
          <p className="text-sm text-gray-400 max-w-sm">
            Try searching for broad terms like "ABC", "Counting", or "Animals".
          </p>
        </div>
      )}
    </section>
  );
}