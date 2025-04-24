import React from "react";

const StaffListSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="flex items-center justify-end">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffListSkeleton;
