import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-white">
      <div className="w-12 h-12 border-4 border-blue-700 border-t-blue-400 rounded-full animate-spin mb-4"></div>
      <p className="text-black text-lg">Loading products...</p>
    </div>
  );
};

export default LoadingSpinner;