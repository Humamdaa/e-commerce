import { useEffect, useState } from 'react';
import { useFilter } from './filters';
import { Menu, X } from 'lucide-react';
import CheckboxSkeleton from './SkeletonCategories';
// import SkeletonCategories from './SkeletonCategories';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    'apple',
    'watch',
    'Fashion',
    'trend',
    'shoes',
    'shirt',
  ]); 
  const [isOpen, setIsOpen] = useState(false);

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
        console.error(
          'Error fetching categories:',
          error instanceof Error ? error.message : 'Unknown error'
        );
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword('');
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:relative w-64 p-5 h-screen bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        } z-40`}
      >
        <h1 className="text-2xl font-bold mb-6 ml-10">My Store</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Price Range</h2>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Min"
              value={minPrice ?? ''}
              onChange={handleMinPriceChange}
            />
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="Max"
              value={maxPrice ?? ''}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Categories</h2>
          {!categories || categories.length === 0 ? (
            <>
              <CheckboxSkeleton count={4} />
            </>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleRadioChangeCategories(category)}
                    className="mr-2"
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              ))}
            </div>
          )}
        </div>
        {/* Keywords */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <button
                key={kw}
                onClick={() => handleKeywordClick(kw)}
                className={`px-3 py-1 rounded-full text-sm ${
                  keyword === kw
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleResetFilter}
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </>
  );
};

export default Sidebar;
