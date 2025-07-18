import { Tally3, X } from 'lucide-react';
import { useState } from 'react';
import { useFilter } from './filters';
import BookCard from './BookCard';
import Sidebar from './Sidebar';
import SkeletonCard from './SkeletonCard';
import { useProductsFetch } from '../hooks/useProductsFetch';

const MainContext = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { products, loading, error } = useProductsFetch({
    keyword,
    currentPage,
  });

  const itemsPerPage = 12;
  const getFiltersProducts = () => {
    let filterProducts = [...products];

    // console.log('data ', filterProducts);
    // console.log('loading ', loading);
    if (selectedCategory) {
      filterProducts = filterProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (minPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filterProducts = filterProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case 'expensive':
        return filterProducts.sort((a, b) => b.price - a.price);

      case 'cheap':
        return filterProducts.sort((a, b) => a.price - b.price);
      case 'popular':
        return filterProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filterProducts;
    }
  };

  const filterProducts = getFiltersProducts();
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageinationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar - hidden on mobile when closed */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <section className="w-full max-w-6xl p-5 mx-auto">
          {/* Filter Dropdown */}
          <div className="mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="relative mb-5 mt-12 w-full sm:w-auto">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="border px-4 py-2 rounded-full flex items-center w-full sm:w-auto justify-between"
                >
                  <div className="flex items-center">
                    {dropdownOpen ? (
                      <X className="mr-2 h-5 w-5" />
                    ) : (
                      <Tally3 className="mr-2 h-5 w-5" />
                    )}
                    {filter === 'all'
                      ? 'Filter'
                      : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40 z-10">
                    <button
                      onClick={() => {
                        setFilter('cheap');
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      Cheap
                    </button>
                    <button
                      onClick={() => {
                        setFilter('expensive');
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      Expensive
                    </button>
                    <button
                      onClick={() => {
                        setFilter('popular');
                        setDropdownOpen(false);
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      Popular
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            {error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <SkeletonCard count={8} />
              </div>
            ) : filterProducts.length === 0 ? (
              <div className="text-center py-10">No products found</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filterProducts.map((product) => (
                  <BookCard
                    key={product.id}
                    id={product.id.toString()}
                    title={product.title}
                    image={product.thumbnail}
                    price={product.price}
                  />
                ))}
              </div>
            )}
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3 pb-10 sm:pb-0">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border px-4 py-2 rounded-full w-full sm:w-auto text-center disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex flex-wrap justify-center gap-2 mb-3 sm:mb-0">
                {getPageinationButtons().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`border px-4 py-2 rounded-full min-w-[40px] ${
                      page === currentPage ? 'bg-black text-white' : ''
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border px-4 py-2  rounded-full w-full sm:w-auto text-center disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainContext;
