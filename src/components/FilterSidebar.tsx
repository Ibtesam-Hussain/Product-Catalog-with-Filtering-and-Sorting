import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useCategories } from '../hooks/useProducts';
import { useFilters } from '../context/FilterContext';

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen = true, onClose }) => {
  const { categories } = useCategories();
  const { filters, updateFilters, clearFilters } = useFilters();
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    updateFilters({ categories: updatedCategories });
  };

  const handlePriceChange = (field: 'min' | 'max', value: number) => {
    updateFilters({
      priceRange: {
        ...filters.priceRange,
        [field]: value
      }
    });
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear All
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900">Categories</h3>
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2 pl-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-gray-900">Price Range</h3>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-3 pl-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Min Price</label>
                <input
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max Price</label>
                <input
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Only render overlay/sidebar on mobile if open
  if (!isOpen) {
    return (
      <div className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24">
        {sidebarContent}
      </div>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay & Slide-in */}
      <div className="md:hidden fixed inset-0 z-50 flex">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={onClose}
        />
        {/* Sidebar slides in from right */}
        <div className="relative ml-auto h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300 translate-x-0">
          <div className="p-6 h-full overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;