# WooCommerce Product Catalog Frontend

A modern, responsive React frontend for displaying WooCommerce products with advanced filtering, searching, and sorting capabilities.

## Features

- 🛍️ **Product Catalog**: Beautiful grid layout with responsive design
- 🔍 **Advanced Search**: Real-time search functionality
- 🏷️ **Category Filtering**: Filter products by categories
- 💰 **Price Range Filtering**: Set minimum and maximum price limits
- 📊 **Multiple Sorting Options**: Sort by price, date, popularity, and rating
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance**: Optimized loading with pagination
- 🎨 **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Headless UI** for accessible components
- **Lucide React** for icons

## Quick Start

### Prerequisites

- Node.js 16+ 
- A running WordPress site with WooCommerce plugin installed
- WooCommerce REST API enabled

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure WooCommerce API:**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_WC_API_BASE=https://your-wordpress-site.com/wp-json/wc/v3
   VITE_WC_CONSUMER_KEY=your-consumer-key
   VITE_WC_CONSUMER_SECRET=your-consumer-secret
   ```

3. **Get WooCommerce API credentials:**
   - Go to your WordPress Admin → WooCommerce → Settings → Advanced → REST API
   - Click "Add Key"
   - Set permissions to "Read"
   - Copy the Consumer Key and Consumer Secret

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation with search
│   ├── ProductCard.tsx # Individual product display
│   ├── ProductGrid.tsx # Product grid with pagination
│   ├── FilterSidebar.tsx # Category and price filters
│   ├── SortDropdown.tsx # Sorting options
│   └── LoadingSpinner.tsx # Loading states
├── pages/              # Main page components
│   ├── Home.tsx        # Product catalog page
│   └── ProductDetail.tsx # Individual product page
├── services/           # API integration
│   └── api.ts          # WooCommerce API calls
├── hooks/              # Custom React hooks
│   └── useProducts.ts  # Product data management
├── context/            # Global state management
│   └── FilterContext.tsx # Filter state
├── types/              # TypeScript definitions
│   └── index.ts        # Product and API types
└── utils/              # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The app connects to WooCommerce REST API endpoints:

- `GET /wp-json/wc/v3/products` - Fetch products with filtering
- `GET /wp-json/wc/v3/products/:id` - Get single product
- `GET /wp-json/wc/v3/products/categories` - Get categories

### Supported Parameters

- `search` - Text search in product names
- `category` - Filter by category IDs
- `orderby` - Sort by: date, price, popularity, rating
- `order` - Sort direction: asc, desc
- `min_price` / `max_price` - Price range filtering
- `per_page` - Products per page (pagination)

## Customization

### Styling
The app uses TailwindCSS for styling. Customize colors, spacing, and components by editing the Tailwind classes.

### API Configuration
Modify `src/services/api.ts` to add custom endpoints or change request handling.

### Components
All components are modular and can be easily customized or extended.

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## Environment Variables

Required environment variables:

```env
VITE_WC_API_BASE=https://yoursite.com/wp-json/wc/v3
VITE_WC_CONSUMER_KEY=ck_your_consumer_key
VITE_WC_CONSUMER_SECRET=cs_your_consumer_secret
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions:
1. Check the README and documentation
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

Built with ❤️ using React and TailwindCSS