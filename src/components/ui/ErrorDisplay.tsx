import React from "react";
import { useError } from "@/context/ErrorContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ErrorDisplay: React.FC = () => {
  const { errors, removeError } = useError();

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 space-y-4 z-50">
      {errors.map((error) => (
        <div
          key={error.id}
          className={`flex items-center gap-3 p-4 rounded-lg shadow-lg max-w-md ${
            error.type === "error"
              ? "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200"
              : error.type === "warning"
              ? "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200"
              : "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200"
          }`}
        >
          <div className="flex-1">
            <p className="text-sm font-medium">{error.message}</p>
          </div>
          <button
            onClick={() => removeError(error.id)}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Dismiss error"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ErrorDisplay;
