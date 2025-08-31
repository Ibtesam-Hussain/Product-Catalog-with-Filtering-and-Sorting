import axios from 'axios';
import { Product } from '../types';

// Configure your WooCommerce API credentials here
// Use local products.json for mock API
const api = axios.create({
  baseURL: 'https://product-catalog-with-filtering-and.vercel.app/', // Backend proxy URL
});

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
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      console.warn('Backend API error:', error);
      throw error;
    }
  },

  // Get single product by ID (support both id and ID fields)
  getProduct: async (id: number): Promise<Product> => {
    try {
      const response = await api.get('/api/products');
      const product = response.data.find((p: any) => p.id === id || p.ID === id);
      if (!product) throw new Error('Product not found');
      return product;
    } catch (error) {
      console.warn('Backend API error:', error);
      throw error;
    }
  },

  // Get product categories
  getCategories: async () => {
    try {
      const response = await api.get('/api/products');
      // Adapt to WooCommerce format: categories may be an array or string
      const categorySet = new Set<string>();
      response.data.forEach((p: any) => {
        if (p.categories && Array.isArray(p.categories)) {
          p.categories.forEach((cat: any) => {
            if (cat.name) categorySet.add(cat.name);
          });
        } else if (p.Categories) {
          p.Categories.split('>').map((cat: string) => cat.trim()).forEach((cat: string) => {
            if (cat) categorySet.add(cat);
          });
        }
      });
      return Array.from(categorySet).map((name) => ({ name }));
    } catch (error) {
      console.warn('Backend API error:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await api.get('/api/products');
      return response.data.filter((product: any) => {
        const name = product.name || product.Name || '';
        const shortDesc = product.short_description || product['Short description'] || '';
        return name.toLowerCase().includes(query.toLowerCase()) || shortDesc.toLowerCase().includes(query.toLowerCase());
      });
    } catch (error) {
      console.warn('Backend API error:', error);
      throw error;
    }
  }
};

export default api;