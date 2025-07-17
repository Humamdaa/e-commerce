import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

export const fetchProduct = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(
    `https://dummyjson.com/products/${id}`
  );
  return response.data;
};
