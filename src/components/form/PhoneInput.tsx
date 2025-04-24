import React, { useState, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { PhoneIcon } from "@heroicons/react/24/outline";

interface PhoneInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
  defaultValue?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  register,
  error,
  className = "",
  defaultValue = "",
}) => {
  const [formattedValue, setFormattedValue] = useState("");

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format based on length
    if (digits.length <= 3) {
      return digits;
    }
    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  };

  // Initialize with the default value
  useEffect(() => {
    if (defaultValue) {
      setFormattedValue(formatPhoneNumber(defaultValue));
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormattedValue(formatted);
    // Call the register's onChange with the unformatted value
    register.onChange({
      target: {
        value: formatted.replace(/\D/g, ""),
        name: register.name,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={className}>
      <label
        htmlFor={register.name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <PhoneIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="tel"
          id={register.name}
          {...register}
          value={formattedValue}
          onChange={handleChange}
          className={`block w-full pl-10 pr-3 py-2 border ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          } rounded-md shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          placeholder="(555) 555-5555"
          maxLength={14} // (123) 456-7890
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
