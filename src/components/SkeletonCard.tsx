import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Don't forget the CSS!

const SkeletonCard = () => {
  return (
    <div className="border p-4 rounded">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        {/* Image placeholder - full width */}
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-32 mb-4"></div>

        {/* Text lines - first line shorter */}
        <div className="mb-2">
          <Skeleton width="90%" height={20} />
        </div>
        <div className="mb-2">
          <Skeleton width="50%" className="c-gray-700" height={20} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonCard;
