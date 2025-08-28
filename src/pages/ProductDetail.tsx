import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(Number(id));

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - ShopEase`;
    }
  }, [product]);

  const formatPrice = (price: string) => {
    return price ? `$${parseFloat(price).toFixed(2)}` : 'N/A';
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    className="w-full h-96 object-cover object-center rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              )}

              {/* Additional Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt || product.name}
                      className="w-20 h-20 object-cover object-center rounded-lg flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Categories */}
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              {/* Rating */}
              {product.average_rating && parseFloat(product.average_rating) > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(parseFloat(product.average_rating))
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.average_rating} ({product.rating_count} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-4">
                {product.on_sale && product.sale_price ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(product.sale_price)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.regular_price)}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full font-medium">
                      On Sale
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Short Description */}
              {product.short_description && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-600">{stripHtml(product.short_description)}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button
                  disabled={product.stock_status !== 'instock'}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
                  </span>
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Product Attributes */}
              {product.attributes && product.attributes.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <dl className="grid grid-cols-1 gap-2">
                    {product.attributes.map((attr) => (
                      <div key={attr.id} className="flex justify-between">
                        <dt className="text-sm text-gray-600">{attr.name}:</dt>
                        <dd className="text-sm text-gray-900">
                          {attr.options.join(', ')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* Full Description */}
          {product.description && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div 
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;