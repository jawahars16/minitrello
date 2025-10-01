const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow p-6 h-32">
    <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
  </div>
);

const BoardListSkeleton = () => {
  return (
    <div>
      {/* Skeleton for the board grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default BoardListSkeleton;
