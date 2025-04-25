import { useOptimisticUpdates } from "@/hooks/useOptimisticUpdates";
import { StaffMember } from "../types";
import { useStaff } from "../context/StaffContext";

export function useStaffOptimisticUpdates() {
  const { editStaff, createStaff, removeStaff } = useStaff();
  const { isUpdating, error, performOptimisticUpdate } =
    useOptimisticUpdates<StaffMember>();

  const optimisticEdit = async (id: string, updates: Partial<StaffMember>) => {
    return performOptimisticUpdate(
      { ...updates, id } as StaffMember,
      () => editStaff(id, updates),
      {
        onError: (error) => {
          console.error("Failed to update staff member:", error);
        },
      }
    );
  };

  const optimisticAdd = async (staff: Omit<StaffMember, "id">) => {
    return performOptimisticUpdate(
      { ...staff, id: "temp" } as StaffMember,
      () => createStaff(staff),
      {
        onError: (error) => {
          console.error("Failed to add staff member:", error);
        },
      }
    );
  };

  const optimisticRemove = async (id: string) => {
    return performOptimisticUpdate(
      { id } as StaffMember,
      () => removeStaff(id),
      {
        onError: (error) => {
          console.error("Failed to remove staff member:", error);
        },
      }
    );
  };

  return {
    isUpdating,
    error,
    optimisticEdit,
    optimisticAdd,
    optimisticRemove,
  };
}
