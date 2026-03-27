export function ProgramCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
      {/* Cover Skeleton */}
      <div className="bg-gray-200 h-48 w-full" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col pt-4">
        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
        </div>
        
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded-md w-full mb-2" />
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4" />
        
        {/* Meta Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="flex gap-2 items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-1/3 bg-gray-200 rounded-md" />
          </div>
        </div>
        
        {/* Price Skeleton */}
        <div className="mt-auto">
          <div className="h-4 w-24 bg-gray-200 rounded-md mb-2" />
          <div className="h-6 w-32 bg-gray-200 rounded-md mb-4" />
          
          {/* Button Skeleton */}
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
