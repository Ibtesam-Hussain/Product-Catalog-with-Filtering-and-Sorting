import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Adapt to products.json format
  // Support both WooCommerce and custom products.json formats
  const name = product.name || (product as any).Name || '';
  const getPrice = () => {
    return product.price || (product as any).regular_price || (product as any).sale_price || (product as any).Price || (product as any)["Regular price"] || (product as any)["Sale price"] || '';
  };
  const categories = product.categories || ((product as any).Categories ? (product as any).Categories.split('>').map((cat: string) => cat.trim()).filter(Boolean) : []);
  let imageSrc = '';
  if (product.images && product.images.length > 0) {
    imageSrc = product.images[0].src;
  } else if ((product as any).Images) {
    imageSrc = (product as any).Images.split(',')[0]?.trim();
  }

  const formatPrice = (price: string) => {
    if (!price) return 'N/A';
    const num = parseFloat(price);
    return isNaN(num) ? 'N/A' : `$${num.toFixed(2)}`;
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id ?? (product as any).ID}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-900 mb-1">{name}</h2>
  {/* Product Price */}
  <div className="text-base font-medium text-green-700 mb-2">{formatPrice(getPrice())}</div>
        {/* Category Badge */}
        {categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {categories.map((cat: any, idx: number) => (
              <span
                key={cat.id ? cat.id : (typeof cat === 'string' ? cat + '-' + idx : idx)}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {typeof cat === 'string' ? cat : (cat.name || '')}
              </span>
            ))}
          </div>
        )}
        {/* Description */}
        <p className="text-sm text-gray-600">{stripHtml(product.short_description || (product as any)["Short description"] || '')}</p>
        {/* Rating */}
        {product.average_rating && parseFloat(product.average_rating) > 0 && (
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(parseFloat(product.average_rating))
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-500">
              ({product.rating_count})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;