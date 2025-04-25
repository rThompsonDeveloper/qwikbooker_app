import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StaffMember, Store } from "../types";
import Button from "@/components/ui/Button";
import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import AddressField from "@/components/form/AddressField";
import { staffApi } from "../services/api/Staff";
import { useStaffOptimisticUpdates } from "../hooks/useStaffOptimisticUpdates";
import { useNavigate } from "react-router-dom";

interface StaffFormProps {
  initialValues?: Partial<StaffMember>;
  onSubmit: (data: Omit<StaffMember, "id">) => Promise<void>;
  isSubmitting?: boolean;
}

const StaffForm: React.FC<StaffFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const { optimisticEdit, optimisticAdd, isUpdating, error } =
    useStaffOptimisticUpdates();

  useEffect(() => {
    staffApi.getStores().then(setStores);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Omit<StaffMember, "id">>({
    defaultValues: {
      ...initialValues,
      assignedStore: initialValues?.assignedStore
        ? {
            id: initialValues.assignedStore.id,
            name: initialValues.assignedStore.name,
          }
        : undefined,
    },
  });

  useEffect(() => {
    if (stores.length > 0 && initialValues?.assignedStore?.id) {
      setValue("assignedStore.id", initialValues.assignedStore.id.toString());
    }
  }, [stores, initialValues?.assignedStore?.id, setValue]);

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStore = stores.find(
      (store) => store.id.toString() === e.target.value
    );
    if (selectedStore) {
      setValue("assignedStore.id", selectedStore.id.toString());
      setValue("assignedStore.name", selectedStore.name);
    }
  };

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "store manager", label: "Store Manager" },
    { value: "staff", label: "Staff" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "inactive", label: "Inactive" },
  ];

  const storeOptions = stores.map((store) => ({
    value: store.id.toString(),
    label: store.name,
  }));

  const handleSubmitForm = async (data: Omit<StaffMember, "id">) => {
    try {
      if (initialValues?.id) {
        await optimisticEdit(initialValues.id, data);
        navigate(`/staff/${initialValues.id}`);
      } else {
        const newStaff = await optimisticAdd(data);
        if (newStaff?.id) {
          navigate(`/staff/${newStaff.id}`);
        } else {
          navigate("/staff");
        }
      }
    } catch (error) {
      // Error is already handled by optimistic updates
      console.error("Form submission failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="First Name"
          register={register("firstName", {
            required: "First name is required",
          })}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          register={register("lastName", { required: "Last name is required" })}
          error={errors.lastName?.message}
        />
        <TextInput
          label="Email"
          type="email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
        />
        <TextInput
          label="Phone Number"
          register={register("phoneNumber", {
            required: "Phone number is required",
          })}
          error={errors.phoneNumber?.message}
        />
        <SelectInput
          label="Role"
          options={roleOptions}
          register={register("role", { required: "Role is required" })}
          error={errors.role?.message}
        />
        <SelectInput
          label="Status"
          options={statusOptions}
          register={register("status", { required: "Status is required" })}
          error={errors.status?.message}
        />
        <SelectInput
          label="Assigned Store"
          options={storeOptions}
          register={register("assignedStore.id", {
            onChange: handleStoreChange,
          })}
          error={errors.assignedStore?.id?.message}
        />
      </div>

      <AddressField
        register={{
          street: register("address.street", {
            required: "Street is required",
          }),
          city: register("address.city", { required: "City is required" }),
          state: register("address.state", { required: "State is required" }),
          zipCode: register("address.zipCode", {
            required: "Zip code is required",
          }),
          country: register("address.country", {
            required: "Country is required",
          }),
        }}
        errors={{
          street: errors.address?.street?.message,
          city: errors.address?.city?.message,
          state: errors.address?.state?.message,
          zipCode: errors.address?.zipCode?.message,
          country: errors.address?.country?.message,
        }}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700"
          disabled={isSubmitting || isUpdating}
        >
          {isSubmitting || isUpdating ? "Saving..." : "Save Staff Member"}
        </Button>
      </div>
    </form>
  );
};

export default StaffForm;
