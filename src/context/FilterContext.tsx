import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FilterOptions } from '../types';

interface FilterContextType {
  filters: FilterOptions;
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
}

const defaultFilters: FilterOptions = {
  categories: [],
  priceRange: { min: 0, max: 1000 },
  search: '',
  sortBy: 'date',
  sortOrder: 'desc'
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};