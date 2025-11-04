import React from 'react';

const CategorySkeleton: React.FC = () => {
  return (
    <div className="text-center animate-pulse w-full">
      <div className="h-10 bg-gray-700 rounded-md w-3/4 mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
