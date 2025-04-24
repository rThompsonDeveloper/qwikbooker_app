import React from "react";
import { useParams } from "react-router-dom";
import { UserCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/form/TextInput";
import AddressField from "@/components/form/AddressField";
import SelectInput from "@/components/form/SelectInput";
import PhoneInput from "@/components/form/PhoneInput";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useStaffForm } from "../hooks/useStaffForm";
import { useStaffFormOptions } from "../hooks/useStaffFormOptions";

const StaffEditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { staff, editStaff } = useStaffData();
  const { navigateToStaffMember } = useStaffNavigation();
  const { roleOptions, statusOptions } = useStaffFormOptions();

  const { register, handleSubmit, errors, isSubmitting } = useStaffForm({
    staff,
    onSubmit: async (data) => {
      await editStaff(id!, data);
      navigateToStaffMember(id!);
    },
    memberId: id,
  });

  const member = staff.find((m) => m.id === id);
  if (!member) {
    return (
      <div className="text-center py-4 text-red-500">
        Staff member not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center space-x-4">
              <UserCircleIcon className="w-16 h-16 text-gray-400" />
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="First Name"
                    register={register("firstName")}
                    error={errors.firstName?.message}
                  />
                  <TextInput
                    label="Last Name"
                    register={register("lastName")}
                    error={errors.lastName?.message}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <div className="space-y-4">
                <TextInput
                  label="Email"
                  register={register("email")}
                  error={errors.email?.message}
                  type="email"
                  icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
                />
                <PhoneInput
                  label="Phone Number"
                  register={register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                  defaultValue={
                    staff?.find((member) => member.id === id)?.phoneNumber
                  }
                />
              </div>
            </div>

            {/* Address */}
            <AddressField
              register={{
                street: register("address.street"),
                city: register("address.city"),
                state: register("address.state"),
                zipCode: register("address.zipCode"),
                country: register("address.country"),
              }}
              errors={{
                street: errors.address?.street?.message,
                city: errors.address?.city?.message,
                state: errors.address?.state?.message,
                zipCode: errors.address?.zipCode?.message,
                country: errors.address?.country?.message,
              }}
            />
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectInput
              label="Role"
              register={register("role")}
              error={errors.role?.message}
              options={roleOptions}
            />

            <SelectInput
              label="Status"
              register={register("status")}
              error={errors.status?.message}
              options={statusOptions}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigateToStaffMember(id!)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffEditForm;
