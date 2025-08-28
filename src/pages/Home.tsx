import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useFilters } from '../context/FilterContext';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';

const Home: React.FC = () => {
  const { products, loading, hasMore, fetchProducts, loadMore } = useProducts();
  const { filters } = useFilters();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch products when filters change
  useEffect(() => {
    const params = {
      search: filters.search || undefined,
      category: filters.categories.length > 0 ? filters.categories.join(',') : undefined,
      orderby: filters.sortBy,
      order: filters.sortOrder,
      min_price: filters.priceRange.min > 0 ? filters.priceRange.min : undefined,
      max_price: filters.priceRange.max < 1000 ? filters.priceRange.max : undefined,
    };

    fetchProducts(params, true);
  }, [filters, fetchProducts]);

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
              {loading ? 'Loading...' : `${products.length} products`}
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
              products={products}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;