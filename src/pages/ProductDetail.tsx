import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import LoadingSpinner from '../components/LoadingSpinner';
import ShimmerButton from '../../components/ShimmerButton';

const ProductDetail: React.FC = () => {
  // State for selected image index (must be before JSX usage)
  const [selectedImageIdx, setSelectedImageIdx] = React.useState(0);
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(Number(id));

  // Support both WooCommerce and products.json formats
  const name = product?.name || (product as any)?.Name || '';
  const description = product?.description || (product as any)?.Description || '';
  const shortDescription = product?.short_description || (product as any)?.['Short description'] || '';
  const images = product?.images?.length ? product.images.map((img: any) => ({ src: img.src, alt: img.alt || name })) : ((product as any)?.Images ? (product as any).Images.split(',').map((src: string) => ({ src: src.trim(), alt: name })) : []);
  const categories = product?.categories?.length ? product.categories.map((cat: any) => cat.name) : ((product as any)?.Categories ? (product as any).Categories.split('>').map((cat: string) => cat.trim()) : []);
  const price = product?.sale_price || product?.price || product?.regular_price || (product as any)?.['Sale price'] || (product as any)?.['Regular price'] || (product as any)?.Price || '';
  const regularPrice = product?.regular_price || (product as any)?.['Regular price'] || '';
  const onSale = product?.on_sale || !!(product as any)?.['Sale price'];
  const stockStatus = product?.stock_status || ((product as any)?.['In stock?'] ? 'instock' : 'outofstock');
  const averageRating = product?.average_rating || (product as any)?.['Average Rating'] || '';
  const ratingCount = product?.rating_count || (product as any)?.['Rating Count'] || '';
  const attributes = product?.attributes || [];

  useEffect(() => {
    if (name) {
      document.title = `${name} - ShopEase`;
    }
  }, [name]);

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
              {/* Main Image with thumbnail selection */}
              {images.length > 0 ? (
                <>
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={images[selectedImageIdx]?.src || images[0].src}
                      alt={images[selectedImageIdx]?.alt || images[0].alt}
                      className="w-full h-96 object-cover object-center rounded-lg"
                    />
                  </div>
                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto mt-2">
                      {images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image.src}
                          alt={image.alt}
                          className={`w-20 h-20 object-cover object-center rounded-lg flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity border-2 ${selectedImageIdx === idx ? 'border-blue-500' : 'border-transparent'}`}
                          onClick={() => setSelectedImageIdx(idx)}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

              {/* Rating */}
              {averageRating && parseFloat(averageRating) > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(parseFloat(averageRating))
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {averageRating} ({ratingCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-4">
                {onSale && price ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      {formatPrice(price)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(regularPrice)}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full font-medium">
                      On Sale
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    stockStatus === 'instock' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {stockStatus === 'instock' ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Short Description */}
              {shortDescription && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-600">{stripHtml(shortDescription)}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <div className="flex-1">
                  <button
                    disabled={stockStatus !== 'instock'}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      stockStatus === 'instock'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>{stockStatus === 'instock' ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Product Attributes */}
              {attributes && attributes.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <dl className="grid grid-cols-1 gap-2">
                    {attributes.map((attr: any, idx: number) => (
                      <div key={attr.id ?? idx} className="flex justify-between">
                        <dt className="text-sm text-gray-600">{attr.name}:</dt>
                        <dd className="text-sm text-gray-900">
                          {attr.options ? attr.options.join(', ') : ''}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* Full Description */}
          {description && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div 
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;