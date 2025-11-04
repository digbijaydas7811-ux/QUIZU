import React from 'react';

const QuizCardSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Progress Bar Skeleton */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="h-5 bg-gray-700 rounded-md w-1/4"></div>
          <div className="h-5 bg-gray-700 rounded-md w-1/4"></div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5"></div>
      </div>

      {/* Quiz Card Skeleton */}
      <div className="bg-neutral p-6 md:p-8 rounded-xl shadow-2xl w-full">
        {/* Question Skeleton */}
        <div className="space-y-3 mb-6">
            <div className="h-7 bg-gray-700 rounded w-full"></div>
            <div className="h-7 bg-gray-700 rounded w-5/6"></div>
        </div>
        
        {/* Options Skeleton */}
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-14 bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCardSkeleton;
