import React from 'react';

export default function ShimmerButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
 const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <button
        className="relative inline-flex items-center justify-center rounded-full overflow-hidden group bg-black cursor-pointer hover:color-grey-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        style={{ padding: 0, border: 'none' }}
        {...props}
      >
        {/* Animated border */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            padding: '2px',
            borderRadius: '9999px',
            background: 'conic-gradient(from var(--angle), #06b6d4 0deg, transparent 120deg, #06b6d4 240deg, transparent 360deg)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        {/* Button content with background */}
  <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-gray-900 bg-white rounded-full group-hover:bg-gray-100 transition-colors duration-300">
          {children || 'Shimmer Button'}
        </span>
      </button>
    </div>
  );
}
