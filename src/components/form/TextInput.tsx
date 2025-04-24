import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  register: UseFormRegisterReturn;
  type?: "text" | "email" | "tel" | "password";
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  icon,
  register,
  type = "text",
  placeholder,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          {...register}
          placeholder={placeholder}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white py-2.5 ${
            icon ? "pl-10 pr-4" : "px-4"
          } ${error ? "border-red-500" : ""}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
