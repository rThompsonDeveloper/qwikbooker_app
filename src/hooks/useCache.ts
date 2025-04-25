import { useRef } from "react";

interface CacheOptions<T> {
  maxSize?: number;
  ttl?: number; // Time to live in milliseconds
  initialData?: Record<string, T>; // Add initial data support
}

export function useCache<T>(options: CacheOptions<T> = {}) {
  const { maxSize = 100, ttl = 5 * 60 * 1000 } = options; // Default 5 minutes TTL
  const cache = useRef(new Map<string, { data: T; timestamp: number }>());

  const get = (key: string): T | undefined => {
    const item = cache.current.get(key);
    if (!item) return undefined;

    // Check if item has expired
    if (Date.now() - item.timestamp > ttl) {
      cache.current.delete(key);
      return undefined;
    }

    return item.data;
  };

  const set = (key: string, data: T) => {
    // Remove oldest item if cache is full
    if (cache.current.size >= maxSize) {
      const oldestKey = Array.from(cache.current.entries()).sort(
        ([, a], [, b]) => a.timestamp - b.timestamp
      )[0][0];
      cache.current.delete(oldestKey);
    }

    cache.current.set(key, { data, timestamp: Date.now() });
  };

  const remove = (key: string) => {
    cache.current.delete(key);
  };

  const clear = () => {
    cache.current.clear();
  };

  return {
    get,
    set,
    remove,
    clear,
    size: () => cache.current.size,
  };
}
