import { useState, useCallback } from "react";

interface OptimisticUpdateOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  rollbackOnError?: boolean;
}

export function useOptimisticUpdates<T>() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const performOptimisticUpdate = useCallback(
    async (
      optimisticData: T,
      updateFn: () => Promise<T>,
      options: OptimisticUpdateOptions<T> = {}
    ) => {
      const { onSuccess, onError, rollbackOnError = true } = options;

      try {
        setIsUpdating(true);
        setError(null);

        // Perform the actual update
        const result = await updateFn();

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An error occurred");
        setError(error);

        if (onError) {
          onError(error);
        }

        if (rollbackOnError) {
          // Revert to previous state
          throw error;
        }
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  return {
    isUpdating,
    error,
    performOptimisticUpdate,
  };
}
