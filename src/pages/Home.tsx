import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useFilters } from '../context/FilterContext';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';

const Home: React.FC = () => {
  const { products, loading } = useProducts();
  const { filters } = useFilters();

  // Search, category, price range filtering, and sorting logic
  let filteredProducts = products.filter(product => {
    const name = product.name || product.Name || '';
    const searchTerm = filters.search?.toLowerCase() || '';
    const matchesSearch = !searchTerm || name.toLowerCase().includes(searchTerm);

    // Category filter: product.Categories is a string like "Clothing > Men > Tops"
    let productCategorySegments: string[] = [];
    if (product.Categories && typeof product.Categories === 'string') {
      productCategorySegments = product.Categories.split('>').map((cat: string) => cat.trim());
    }
    // If no categories selected, match all
    const selectedCategories = filters.categories || [];
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(selectedCat =>
        typeof selectedCat === 'string' &&
        productCategorySegments.some(segment => segment.toLowerCase() === selectedCat.toLowerCase())
      );

    // Price filter: check product price against filters.priceRange
    // Try Sale price, Regular price, or price
    let priceStr = product.price || product.sale_price || product.regular_price || product["Sale price"] || product["Regular price"] || '';
    let priceNum = parseFloat(priceStr) || 0;
    const matchesPrice = priceNum >= filters.priceRange.min && priceNum <= filters.priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting logic
  const { sortBy, sortOrder } = filters;
  filteredProducts = filteredProducts.sort((a, b) => {
    let compare = 0;
    // Price
    if (sortBy === 'price') {
      const aPrice = parseFloat(a.price || a.sale_price || a.regular_price || a["Sale price"] || a["Regular price"] || '0') || 0;
      const bPrice = parseFloat(b.price || b.sale_price || b.regular_price || b["Sale price"] || b["Regular price"] || '0') || 0;
      compare = aPrice - bPrice;
    }
    // Date
    else if (sortBy === 'date') {
      const aDate = new Date(a.date_created || a["Date Created"] || '').getTime();
      const bDate = new Date(b.date_created || b["Date Created"] || '').getTime();
      compare = aDate - bDate;
    }
    // Rating
    else if (sortBy === 'rating') {
      const aRating = parseFloat(a.average_rating || a["Average Rating"] || '0') || 0;
      const bRating = parseFloat(b.average_rating || b["Average Rating"] || '0') || 0;
      compare = aRating - bRating;
    }
    // Popularity
    else if (sortBy === 'popularity') {
      const aSales = parseInt(a.total_sales || a["Total Sales"] || '0', 10) || 0;
      const bSales = parseInt(b.total_sales || b["Total Sales"] || '0', 10) || 0;
      compare = aSales - bSales;
    }
    // Default: no sorting
    else {
      compare = 0;
    }
    return sortOrder === 'asc' ? compare : -compare;
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch products when filters change
  // No need to fetch products on filter change, all products are loaded at once

  // Infinite scroll effect

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">
            Discover our amazing collection of products
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            {/* Results Count */}
            <span className="text-sm text-gray-600">
              {loading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
            </span>
          </div>

          {/* Sort Dropdown */}
          <SortDropdown />
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar />
          </div>
          {/* Mobile Sidebar */}
          {showMobileFilters && (
            <FilterSidebar isOpen={true} onClose={() => setShowMobileFilters(false)} />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;