import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
  thumbnail: string;
}

interface FetchProductsParams {
  keyword?: string;
  currentPage: number;
}

export const fetchProductsPerPage = async ({
  keyword,
  currentPage,
}: FetchProductsParams): Promise<Product[]> => {
  const itemsPerPage = 12;
  let url: string;

  try {
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    } else {
      url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`;
    }

    const response = await axios.get<{ products: Product[] }>(url);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
