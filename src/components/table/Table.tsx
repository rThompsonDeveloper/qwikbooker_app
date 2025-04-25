import React, { useMemo, useRef, useEffect } from "react";
import { FixedSizeList as List } from "react-window";

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
  rowHeight?: number;
  onEndReached?: () => void;
  isLoading?: boolean;
}

const Table = <T,>({
  columns,
  data,
  keyExtractor,
  className = "",
  onRowClick,
  rowHeight = 72, // Default height for a row
  onEndReached,
  isLoading = false,
}: TableProps<T>) => {
  const gridTemplateColumns = useMemo(
    () => `repeat(${columns.length}, 1fr)`,
    [columns.length]
  );

  const hasReachedEndRef = useRef(false);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = data[index];
    return (
      <div
        key={keyExtractor(item)}
        className="grid cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
        style={{
          ...style,
          gridTemplateColumns,
        }}
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
    );
  };

  const handleItemsRendered = ({
    visibleStopIndex,
  }: {
    visibleStopIndex: number;
  }) => {
    if (
      visibleStopIndex === data.length - 1 &&
      onEndReached &&
      !hasReachedEndRef.current &&
      !isLoading
    ) {
      hasReachedEndRef.current = true;
      onEndReached();
      setTimeout(() => (hasReachedEndRef.current = false), 1000);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="grid" style={{ gridTemplateColumns }}>
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

      {/* Virtualized Rows */}
      <List
        height={Math.min(data.length * rowHeight, 500)} // Max height of 500px
        itemCount={data.length}
        itemSize={rowHeight}
        width="100%"
        onItemsRendered={handleItemsRendered}
      >
        {Row}
      </List>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Table) as <T>(props: TableProps<T>) => JSX.Element;
