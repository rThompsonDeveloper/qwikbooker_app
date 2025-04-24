import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { MapPinIcon } from "@heroicons/react/24/outline";
import TextInput from "./TextInput";

interface AddressFieldProps {
  register: {
    street: UseFormRegisterReturn;
    city: UseFormRegisterReturn;
    state: UseFormRegisterReturn;
    zipCode: UseFormRegisterReturn;
    country: UseFormRegisterReturn;
  };
  errors?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  className?: string;
}

const AddressField: React.FC<AddressFieldProps> = ({
  register,
  errors,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Address
      </h2>
      <div className="space-y-4">
        <TextInput
          label="Street"
          register={register.street}
          error={errors?.street}
          icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="City"
            register={register.city}
            error={errors?.city}
          />
          <TextInput
            label="State"
            register={register.state}
            error={errors?.state}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="ZIP Code"
            register={register.zipCode}
            error={errors?.zipCode}
          />
          <TextInput
            label="Country"
            register={register.country}
            error={errors?.country}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressField;
