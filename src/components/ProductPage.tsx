import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonProductPage from './SkeletonProductPage';
import { useProductFetch } from '../hooks/useSpecificProductFetch';


const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [product, setProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useS;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { product, loading, error } = useProductFetch(id);

  if (loading) return <SkeletonProductPage />;
  if (error) return <div className="p-5 text-red-500">{error}</div>;
  if (!product) return <div className="p-5">Product not found</div>;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="p-5 w-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded hover:bg-gray-500"
      >
        Back
      </button>
      <div className="relative mb-5">
        {/* Main Image */}
        <div className="w-full h-96 overflow-hidden">
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.title} - ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
            }}
          />
        </div>

        {/* Navigation Arrows (only show if multiple images) */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              &gt;
            </button>
          </>
        )}

        {/* Thumbnail Scroll (only show if multiple images) */}
        {product.images.length > 1 && (
          <div className="flex overflow-x-auto gap-2 mt-2 py-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 ${
                  index === currentImageIndex
                    ? 'border-blue-500'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <h1 className="text-4xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-2xl text-gray-700 w-[70%]">
        {product.description}
      </p>
      <div className="flex text-xl">
        <p>Price: ${product.price}</p>
        <p className="ml-10">rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
