import { useEffect, useState } from 'react';
import { fetchProduct } from '../api/productApi';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

export const useProductFetch = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return { product, loading, error };
};
