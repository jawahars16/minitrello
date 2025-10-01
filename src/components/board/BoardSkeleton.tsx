const LaneSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-4 w-80 flex-shrink-0 border-gray-200"
       style={{
           borderTopWidth: '18px',
           borderBottomWidth: '2px',
           borderTopStyle: 'solid',
       }}>
    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
    <div className="space-y-3">
      <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const BoardSkeleton = () => {
  return (
    <div className="p-2  h-[85vh]">
      {/* Skeleton for the board title */}
      <div className="w-1/3 h-10 bg-gray-200 rounded animate-pulse mb-8"></div>
      
      {/* Skeleton for the lanes */}
      <div className="flex space-x-4 h-full pb-8 overflow-x-auto">
        <LaneSkeleton />
        <LaneSkeleton />
        <LaneSkeleton />
        <LaneSkeleton />
      </div>
    </div>
  );
};

export default BoardSkeleton;
