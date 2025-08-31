# Product Catalog with Filtering and Sorting

## Overview
A full-stack e-commerce product catalog built with React (Vite, TypeScript, TailwindCSS) for the frontend, Node.js/Express for the backend API proxy, and WooCommerce (WordPress) as the product source.

## Features
- Product listing with filtering (search, category, price range)
- Sorting (price, rating, newest, best selling)
- Product detail page with images, price, stock status, and attributes
- Add to Cart/Out of Stock button
- Backend proxy for WooCommerce API (handles OAuth 1.0a)
- Responsive, modern UI

## Project Structure
```
productCatalog/
├── components/         # Reusable React components
├── lib/                # Utility functions
├── src/                # Main React app source
│   ├── components/     # UI components
│   ├── context/        # React Context for filters
│   ├── hooks/          # Custom hooks (API fetching)
│   ├── pages/          # Page components (Home, ProductDetail)
│   ├── services/       # API service layer
│   ├── types/          # TypeScript types
│   ├── index.css       # Global styles
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
├── backend/            # Node.js/Express backend proxy
├── package.json        # Project dependencies
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # TailwindCSS config
├── README.md           # Project documentation
```

## Setup & Development

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- WordPress with WooCommerce (local or public)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory for WooCommerce API keys:
```
WOOCOMMERCE_CONSUMER_KEY=your_key
WOOCOMMERCE_CONSUMER_SECRET=your_secret
WOOCOMMERCE_URL=https://your-wordpress-site.com
```

### 4. Run Locally
- **Frontend:**
  ```bash
  npm run dev
  ```
- **Backend:**
  ```bash
  cd backend
  node index.js
  ```

### 5. Connect Frontend to Backend
Set the frontend API base URL to your backend (e.g., `http://localhost:3001/api`).

## Deployment (Vercel)

### Frontend
1. Push your code to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel.
3. Vercel auto-detects React/Vite and deploys.
4. Set environment variables for API URLs in Vercel dashboard.

### Backend
- Move backend code to `/api` for Vercel serverless functions, or deploy as a separate Vercel project.
- Set WooCommerce API keys in Vercel environment variables.
- Ensure your WordPress site is publicly accessible (not localhost) for production. Use [ngrok](https://ngrok.com/) for testing if needed.

## API Endpoints
- `GET /api/products` — Fetch all products
- `GET /api/categories` — Fetch product categories
- `GET /api/products/:id` — Fetch product details
- `GET /api/search?q=term` — Search products

## Customization
- Edit styles in `index.css` and `tailwind.config.js`
- Add new components in `src/components/`
- Extend backend logic in `backend/index.js`

## Troubleshooting
- If products/categories do not load, check backend API and WooCommerce credentials.
- For CORS issues, ensure frontend calls the backend proxy, not WooCommerce directly.
- For deployment, WordPress must be public (not localhost) for Vercel backend to access.

## License
MIT

## Author
Ibtesam Hussain