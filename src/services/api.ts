import axios from 'axios';
import { Product } from '../types';

// Mock data for development when API is not configured
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Sample Product 1",
    slug: "sample-product-1",
    permalink: "",
    date_created: "2024-01-01T00:00:00",
    date_modified: "2024-01-01T00:00:00",
    type: "simple",
    status: "publish",
    featured: false,
    catalog_visibility: "visible",
    description: "This is a sample product description.",
    short_description: "Sample product for demonstration",
    sku: "SAMPLE-001",
    price: "29.99",
    regular_price: "29.99",
    sale_price: "",
    date_on_sale_from: null,
    date_on_sale_to: null,
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: -1,
    download_expiry: -1,
    external_url: "",
    button_text: "",
    tax_status: "taxable",
    tax_class: "",
    manage_stock: false,
    stock_quantity: null,
    backorders: "no",
    backorders_allowed: false,
    backordered: false,
    low_stock_amount: null,
    sold_individually: false,
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "4.5",
    rating_count: 10,
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [{ id: 1, name: "Electronics", slug: "electronics" }],
    tags: [],
    images: [
      {
        id: 1,
        date_created: "2024-01-01T00:00:00",
        date_modified: "2024-01-01T00:00:00",
        src: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
        name: "Sample Product Image",
        alt: "Sample Product"
      }
    ],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    price_html: "$29.99",
    related_ids: [],
    meta_data: [],
    stock_status: "instock"
  },
  {
    id: 2,
    name: "Sample Product 2",
    slug: "sample-product-2",
    permalink: "",
    date_created: "2024-01-01T00:00:00",
    date_modified: "2024-01-01T00:00:00",
    type: "simple",
    status: "publish",
    featured: true,
    catalog_visibility: "visible",
    description: "Another sample product for testing.",
    short_description: "Premium sample product",
    sku: "SAMPLE-002",
    price: "49.99",
    regular_price: "59.99",
    sale_price: "49.99",
    date_on_sale_from: null,
    date_on_sale_to: null,
    on_sale: true,
    purchasable: true,
    total_sales: 5,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: -1,
    download_expiry: -1,
    external_url: "",
    button_text: "",
    tax_status: "taxable",
    tax_class: "",
    manage_stock: false,
    stock_quantity: null,
    backorders: "no",
    backorders_allowed: false,
    backordered: false,
    low_stock_amount: null,
    sold_individually: false,
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    shipping_required: true,
    shipping_taxable: true,
    shipping_class: "",
    shipping_class_id: 0,
    reviews_allowed: true,
    average_rating: "5.0",
    rating_count: 3,
    upsell_ids: [],
    cross_sell_ids: [],
    parent_id: 0,
    purchase_note: "",
    categories: [{ id: 2, name: "Clothing", slug: "clothing" }],
    tags: [],
    images: [
      {
        id: 2,
        date_created: "2024-01-01T00:00:00",
        date_modified: "2024-01-01T00:00:00",
        src: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
        name: "Sample Product 2 Image",
        alt: "Sample Product 2"
      }
    ],
    attributes: [],
    default_attributes: [],
    variations: [],
    grouped_products: [],
    menu_order: 0,
    price_html: "<del>$59.99</del> $49.99",
    related_ids: [],
    meta_data: [],
    stock_status: "instock"
  }
];

const mockCategories = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Clothing", slug: "clothing" },
  { id: 3, name: "Books", slug: "books" },
  { id: 4, name: "Home & Garden", slug: "home-garden" }
];

// Configure your WooCommerce API credentials here
const WC_API_BASE = import.meta.env.VITE_WC_API_BASE;
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Check if API is configured
const isApiConfigured = WC_API_BASE && WC_CONSUMER_KEY && WC_CONSUMER_SECRET;

const api = isApiConfigured ? axios.create({
  baseURL: WC_API_BASE,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
}) : null;

export interface ProductsParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'price' | 'popularity' | 'rating';
  order?: 'asc' | 'desc';
  min_price?: number;
  max_price?: number;
}

export const productApi = {
  // Get all products with optional filtering
  getProducts: async (params: ProductsParams = {}): Promise<Product[]> => {
    try {
      // Use mock data if API is not configured
      if (!isApiConfigured || !api) {
        console.warn('WooCommerce API not configured. Using mock data. Please set up your .env.local file with API credentials.');
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Filtering logic for mock data
        let filtered = [...mockProducts];
        if (params.search) {
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(params.search!.toLowerCase()) ||
            product.short_description.toLowerCase().includes(params.search!.toLowerCase())
          );
        }
        if (params.category) {
          const categoryIds = params.category.split(',').map(Number);
          filtered = filtered.filter(product =>
            product.categories.some(cat => categoryIds.includes(cat.id))
          );
        }
        if (params.min_price !== undefined) {
          filtered = filtered.filter(product => parseFloat(product.price) >= params.min_price!);
        }
        if (params.max_price !== undefined) {
          filtered = filtered.filter(product => parseFloat(product.price) <= params.max_price!);
        }
        if (params.orderby) {
          if (params.orderby === 'price') {
            filtered.sort((a, b) => (parseFloat(a.price) - parseFloat(b.price)) * (params.order === 'desc' ? -1 : 1));
          } else if (params.orderby === 'date') {
            filtered.sort((a, b) => (new Date(a.date_created).getTime() - new Date(b.date_created).getTime()) * (params.order === 'desc' ? -1 : 1));
          } else if (params.orderby === 'rating') {
            filtered.sort((a, b) => (parseFloat(a.average_rating) - parseFloat(b.average_rating)) * (params.order === 'desc' ? -1 : 1));
          }
        }
        return filtered;

      }

      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.warn('WooCommerce API error. Falling back to mock data:', error);
      return mockProducts;
    }
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<Product> => {
    try {
      // Use mock data if API is not configured
      if (!isApiConfigured || !api) {
        console.warn('WooCommerce API not configured. Using mock data.');
        await new Promise(resolve => setTimeout(resolve, 300));
        const product = mockProducts.find(p => p.id === id);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      }

      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn('WooCommerce API error. Falling back to mock data:', error);
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
  },

  // Get product categories
  getCategories: async () => {
    try {
      // Use mock data if API is not configured
      if (!isApiConfigured || !api) {
        console.warn('WooCommerce API not configured. Using mock data.');
        await new Promise(resolve => setTimeout(resolve, 200));
        return mockCategories;
      }

      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.warn('WooCommerce API error. Falling back to mock data:', error);
      return mockCategories;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      // Use mock data if API is not configured
      if (!isApiConfigured || !api) {
        console.warn('WooCommerce API not configured. Using mock data.');
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.short_description.toLowerCase().includes(query.toLowerCase())
        );
      }

      const response = await api.get('/products', {
        params: { search: query }
      });
      return response.data;
    } catch (error) {
      console.warn('WooCommerce API error. Falling back to mock data:', error);
      return mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.short_description.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
};

export default api;