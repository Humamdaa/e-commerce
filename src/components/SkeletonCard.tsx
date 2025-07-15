import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Don't forget the CSS!

interface SkeletonCardProps {
  count?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border p-4 rounded w-full">
          <SkeletonTheme highlightColor="#444">
            {/* Image placeholder - full width */}
            <Skeleton className="w-full h-32 object-cover mb-2 bg-gray-500" />

            {/* Text lines - first line shorter */}
            <div className="mb-2">
              <Skeleton width="90%" height={24} />
            </div>
            <div className="mb-2">
              <Skeleton width="50%" className="c-gray-700" height={20} />
            </div>
          </SkeletonTheme>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
