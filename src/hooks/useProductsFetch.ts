import { useEffect, useState } from 'react';
import { fetchProductsPerPage } from '../api/productsPerPageApi';

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  thumbnail: string;

}

interface FetchProductsParams {
  keyword?: string;
  currentPage: number;
}

export const useProductsFetch = ({
  keyword,
  currentPage,
}: FetchProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]); // Changed from Product | null to Product[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductsPerPage({ keyword, currentPage });
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [keyword, currentPage]);

  return { products, loading, error };
};
