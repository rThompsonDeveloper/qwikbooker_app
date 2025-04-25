import axios from "axios";
import { StaffMember } from "../../types";
import { mockStaff } from "../../mocks/staffData";
import { ApiErrorHandler } from "@/utils/errors";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// API endpoints
const API_ENDPOINTS = {
  STAFF: `${API_BASE_URL}/api/staff`,
  STAFF_MEMBER: (id: string) => `${API_BASE_URL}/api/staff/${id}`,
};

const handleApiError = (error: unknown): never => {
  const appError = ApiErrorHandler.handleApiError(error);
  throw appError;
};

// Development mode API service
const devApi = {
  getStaff: async (): Promise<StaffMember[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockStaff;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getStaffMember: async (id: string): Promise<StaffMember> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const member = mockStaff.find((m) => m.id === id);
      if (!member) {
        throw new Error("Staff member not found");
      }
      return member;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createStaff: async (staff: Omit<StaffMember, "id">): Promise<StaffMember> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newMember: StaffMember = {
        ...staff,
        id: Math.random().toString(36).substring(2, 11),
      };
      mockStaff.push(newMember);
      return newMember;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateStaff: async (
    id: string,
    staff: Partial<StaffMember>
  ): Promise<StaffMember> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = mockStaff.findIndex((m) => m.id === id);
      if (index === -1) {
        throw new Error("Staff member not found");
      }
      mockStaff[index] = { ...mockStaff[index], ...staff };
      return mockStaff[index];
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteStaff: async (id: string): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = mockStaff.findIndex((m) => m.id === id);
      if (index === -1) {
        throw new Error("Staff member not found");
      }
      mockStaff.splice(index, 1);
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Production mode API service
const prodApi = {
  getStaff: async (): Promise<StaffMember[]> => {
    try {
      const response = await axios.get(API_ENDPOINTS.STAFF);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getStaffMember: async (id: string): Promise<StaffMember> => {
    try {
      const response = await axios.get(API_ENDPOINTS.STAFF_MEMBER(id));
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  createStaff: async (staff: Omit<StaffMember, "id">): Promise<StaffMember> => {
    try {
      const response = await axios.post(API_ENDPOINTS.STAFF, staff);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateStaff: async (
    id: string,
    staff: Partial<StaffMember>
  ): Promise<StaffMember> => {
    try {
      const response = await axios.patch(API_ENDPOINTS.STAFF_MEMBER(id), staff);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteStaff: async (id: string): Promise<void> => {
    try {
      await axios.delete(API_ENDPOINTS.STAFF_MEMBER(id));
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Export the appropriate API service based on environment
export const staffApi = import.meta.env.DEV ? devApi : prodApi;
