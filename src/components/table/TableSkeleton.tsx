import React from "react";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  rowHeight?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 10,
  rowHeight = 72,
}) => {
  const gridTemplateColumns = `repeat(${columns}, 1fr)`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Header Skeleton */}
      <div className="grid" style={{ gridTemplateColumns }}>
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={index}
            className="p-4 font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Rows Skeleton */}
      <div className="h-[500px]">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid border-b border-gray-200 dark:border-gray-700"
            style={{
              gridTemplateColumns,
              height: rowHeight,
            }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="p-4">
                {colIndex === 0 ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
