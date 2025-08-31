import { useState, useEffect, useCallback } from 'react';
import { Product, Category } from '../types';
import { productApi, ProductsParams } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const allProducts = await productApi.getProducts();
        setProducts(allProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return {
    products,
    loading,
    error
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productApi.getCategories();
        // Ensure each category has id and slug for correct typing
        setCategories(data.map((cat: any, idx: number) => ({
          id: cat.id ?? idx,
          name: cat.name,
          slug: cat.slug ?? (typeof cat.name === 'string' ? cat.name.toLowerCase().replace(/\s+/g, '-') : String(idx))
        })));
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};