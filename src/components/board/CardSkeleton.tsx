const CardSkeleton = () => {
  return (
    <div className="p-3 h-20 mb-3 bg-gray-100 rounded-sm shadow-md cursor-pointer hover:shadow-lg">
      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

export default CardSkeleton;
