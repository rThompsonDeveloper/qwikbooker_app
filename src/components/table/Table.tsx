import React, { useMemo, useRef, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import TableSkeleton from "./TableSkeleton";

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
  const lastDataLengthRef = useRef(data.length);

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
    // Only trigger onEndReached if:
    // 1. We're not loading
    // 2. We haven't already triggered it recently
    // 3. We're actually at the end of the list
    // 4. The data length hasn't changed (to prevent false triggers during search)
    if (
      !isLoading &&
      !hasReachedEndRef.current &&
      visibleStopIndex === data.length - 1 &&
      lastDataLengthRef.current === data.length
    ) {
      hasReachedEndRef.current = true;
      onEndReached?.();
      setTimeout(() => (hasReachedEndRef.current = false), 1000);
    }
  };

  // Update the last data length ref when data changes
  useEffect(() => {
    lastDataLengthRef.current = data.length;
  }, [data.length]);

  if (isLoading && data.length === 0) {
    return <TableSkeleton columns={columns.length} />;
  }

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
      <div className="h-[500px]">
        <List
          height={500}
          itemCount={data.length || 10} // Show 10 empty rows if no data
          itemSize={rowHeight}
          width="100%"
          onItemsRendered={handleItemsRendered}
        >
          {Row}
        </List>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 dark:border-blue-300"></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Table) as <T>(props: TableProps<T>) => JSX.Element;
