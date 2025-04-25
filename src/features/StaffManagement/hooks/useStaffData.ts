import { useEffect } from "react";
import { useStaff } from "../context/StaffContext";
import { useParams } from "react-router-dom";
import { StaffMember } from "../types";
import { StaffMemberFormData } from "../forms/schemas/staff";

export const useStaffData = () => {
  const { staff, fetchStaff, loading, error, editStaff } = useStaff();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const getStaffMemberById = (id: string): StaffMember | undefined => {
    return staff.find((member) => member.id === id);
  };

  const getCurrentStaffMember = (): StaffMember | undefined => {
    if (!id) return undefined;
    return getStaffMemberById(id);
  };

  const handleEditStaff = async (id: string, data: StaffMemberFormData) => {
    await editStaff(id, data);
  };

  return {
    staff,
    loading,
    error,
    currentStaffMember: getCurrentStaffMember(),
    getStaffMemberById,
    editStaff: handleEditStaff,
  };
};
