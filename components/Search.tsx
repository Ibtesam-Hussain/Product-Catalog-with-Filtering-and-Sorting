"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';

// --- ICONS ---
const CommandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
);

interface SearchProps {
  onSearch: (query: string) => void;
}

import { Product } from '../src/types';
import { productApi } from '../src/services/api';

// Use mockProducts from productApi's internal mock data
const getMockProducts = () => {
  // @ts-ignore: Accessing internal mock data for demo
  return (productApi as any).__proto__.constructor.mockProducts || [];
};


const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProducts = getMockProducts().filter((product: Product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.short_description.toLowerCase().includes(searchTerm.toLowerCase())
);



  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center font-sans w-full">
        <div className="w-full">
          <div className="relative p-px rounded-2xl bg-gradient-to-r from-orange-500 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 transition-shadow duration-300 hover:shadow-purple-500/40 focus-within:shadow-purple-500/40">
            <div className="flex items-center w-full px-4 py-2 bg-white/80 rounded-[15px]">
              <SearchIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-full px-3 py-1 text-lg text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none flex-1 min-w-0"
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center justify-center p-1.5 bg-gray-200 border border-gray-300 rounded-md shadow-inner">
                  <CommandIcon />
                </div>
                <div className="flex items-center justify-center w-6 h-6 p-1 bg-gray-200 border border-gray-300 rounded-md shadow-inner">
                  <span className="text-sm font-semibold text-gray-600">K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Render product cards below search bar */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col">
            <img src={product.images[0]?.src} alt={product.name} className="h-40 w-full object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.short_description}</p>
            <span className="text-blue-600 font-semibold text-lg">${product.price}</span>
          </div>
        ))}
        {/* {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-4">No products found for "{searchTerm}"</div>
        )} */}
      </div>
    </div>
  );
};

export default Search;
