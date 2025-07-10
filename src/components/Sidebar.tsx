import { React, useEffect, useState } from 'react';

interface FetchResponse {
  category: Product[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    'apple',
    'watch',
    'Fashion',
    'trend',
    'shoes',
    'shirt',
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(`error fetcheing categories : `, error.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text 2xl font-bold mb-10 mt-4">My Store</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="search product"
        />
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
          />
        </div>
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categorites</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16] h-[16px]"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>
        {/* keywords Section */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
