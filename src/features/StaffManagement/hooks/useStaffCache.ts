import { useCallback } from "react";
import { useCache } from "@/hooks/useCache";
import { StaffMember } from "../types";
import { staffApi } from "../services/api/Staff";

export const useStaffCache = () => {
  const cache = useCache<StaffMember>({
    maxSize: 50, // Store up to 50 staff members
    ttl: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const getStaffMember = useCallback(
    async (id: string) => {
      // Check cache first
      const cached = cache.get(id);
      if (cached) return cached;

      // Fetch if not in cache
      const staff = await staffApi.getStaffMember(id);
      cache.set(id, staff);
      return staff;
    },
    [cache]
  );

  const updateStaffMember = useCallback(
    async (id: string, updates: Partial<StaffMember>) => {
      const updated = await staffApi.updateStaff(id, updates);
      cache.set(id, updated);
      return updated;
    },
    [cache]
  );

  const invalidateStaffMember = useCallback(
    (id: string) => {
      cache.remove(id);
    },
    [cache]
  );

  return {
    getStaffMember,
    updateStaffMember,
    invalidateStaffMember,
  };
};
