import React from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  className?: string;
  onRowClick?: (item: T) => void;
}

const Table = <T,>({
  columns,
  data,
  keyExtractor,
  className = "",
  onRowClick,
}: TableProps<T>) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className={`p-4 font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 ${
              column.align === "right"
                ? "text-right"
                : column.align === "center"
                ? "text-center"
                : ""
            }`}
          >
            {column.header}
          </div>
        ))}
      </div>

      {/* Rows */}
      {data.map((item) => (
        <div
          key={keyExtractor(item)}
          className="grid cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
          onClick={() => onRowClick?.(item)}
        >
          {columns.map((column) => (
            <div
              key={`${keyExtractor(item)}-${column.key}`}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                column.align === "right"
                  ? "text-right"
                  : column.align === "center"
                  ? "text-center"
                  : ""
              }`}
            >
              {column.render(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
