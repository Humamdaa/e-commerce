const SkeletonProductPage = () => {
  return (
    <div className="items-center w-full mx-auto mt-25">
      <div className="flex-1 flex justify-center">
        <svg
          className="w-60 h-90 text-gray-200 dark:text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="h-5 w-150 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
        <div className="h-4 w-175 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2.5 w-100 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      </div>
    </div>
  );
};

export default SkeletonProductPage;
