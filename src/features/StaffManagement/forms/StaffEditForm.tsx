import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { UserCircleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/form/TextInput";
import AddressField from "@/components/form/AddressField";
import SelectInput from "@/components/form/SelectInput";
import PhoneInput from "@/components/form/PhoneInput";
import Button from "@/components/ui/Button";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useStaffForm } from "../hooks/useStaffForm";
import { useStaffFormOptions } from "../hooks/useStaffFormOptions";
import { StaffMemberFormData } from "../forms/schemas/staff";

const StaffEditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { staff, editStaff } = useStaffData();
  const { navigateToStaffMember } = useStaffNavigation();
  const { roleOptions, statusOptions } = useStaffFormOptions();

  const handleSubmit = useCallback(
    async (data: StaffMemberFormData) => {
      if (id) {
        await editStaff(id, data);
        navigateToStaffMember(id);
      }
    },
    [editStaff, navigateToStaffMember, id]
  );

  const handleCancel = useCallback(() => {
    if (id) {
      navigateToStaffMember(id);
    }
  }, [navigateToStaffMember, id]);

  const {
    register,
    handleSubmit: formHandleSubmit,
    errors,
    isSubmitting,
  } = useStaffForm({
    staff,
    onSubmit: handleSubmit,
    memberId: id,
  });

  const member = useMemo(() => staff.find((m) => m.id === id), [staff, id]);

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
        <form onSubmit={formHandleSubmit} className="p-6 space-y-6">
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
                  defaultValue={member.phoneNumber}
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
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              size="md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(StaffEditForm);
