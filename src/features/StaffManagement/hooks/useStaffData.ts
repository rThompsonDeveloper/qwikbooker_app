import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { StaffMember } from "../types";
import { useStaff } from "../context/StaffContext";

export const useStaffData = () => {
  const { id } = useParams<{ id: string }>();
  const { staff, loading, error, fetchStaff, currentPage, hasMore } =
    useStaff();

  const currentStaffMember = id
    ? staff.find((member) => member.id === id)
    : undefined;

  const getStaffMemberById = useCallback(
    (memberId: string) => {
      return staff.find((member) => member.id === memberId);
    },
    [staff]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchStaff(currentPage + 1);
    }
  }, [fetchStaff, loading, hasMore, currentPage]);

  return {
    staff,
    loading,
    error,
    currentStaffMember,
    getStaffMemberById,
    fetchStaff: loadMore,
    isLoading: loading,
    hasMore,
  };
};
