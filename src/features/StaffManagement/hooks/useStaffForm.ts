import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffMemberSchema, StaffMemberFormData } from "../forms/schemas/staff";
import { StaffMember } from "../context/StaffContext";

interface UseStaffFormProps {
  staff: StaffMember[];
  onSubmit: (data: StaffMemberFormData) => Promise<void>;
  memberId?: string;
}

export const useStaffForm = ({
  staff,
  onSubmit,
  memberId,
}: UseStaffFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StaffMemberFormData>({
    resolver: zodResolver(staffMemberSchema),
  });

  useEffect(() => {
    if (memberId) {
      const member = staff.find((m) => m.id === memberId);
      if (member) {
        // Set form values from the staff member data
        Object.entries(member).forEach(([key, value]) => {
          setValue(key as keyof StaffMemberFormData, value);
        });
      }
    }
  }, [memberId, setValue, staff]);

  const handleFormSubmit = async (data: StaffMemberFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
  };
};
