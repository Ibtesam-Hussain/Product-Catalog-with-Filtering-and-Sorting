import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading
}) => {
  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🛒</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 text-center max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default ProductGrid;