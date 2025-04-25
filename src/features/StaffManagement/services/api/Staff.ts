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
  console.error("API Error:", error);
  throw error;
};

// Development mode API service
const devApi = {
  getStaff: async (page: number = 1): Promise<StaffMember[]> => {
    if (import.meta.env.DEV) {
      // Add a small delay to show the skeleton loader
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Simulate pagination in dev mode
      const start = (page - 1) * 10;
      const end = start + 10;
      return mockStaff.slice(start, end);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/staff?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }
      return await response.json();
    } catch (error) {
      handleApiError(error);
      return []; // Return empty array on error
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
  getStaff: async (page: number = 1): Promise<StaffMember[]> => {
    if (import.meta.env.DEV) {
      // Simulate pagination in dev mode
      const start = (page - 1) * 10;
      const end = start + 10;
      return mockStaff.slice(start, end);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/staff?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }
      return await response.json();
    } catch (error) {
      handleApiError(error);
      return []; // Return empty array on error
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

export const getStaff = async (): Promise<StaffMember[]> => {
  try {
    const response = await fetch("/api/staff");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStaffMember = async (id: string): Promise<StaffMember> => {
  try {
    const response = await fetch(`/api/staff/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const createStaff = async (
  staffMember: StaffMember
): Promise<StaffMember> => {
  try {
    const response = await fetch("/api/staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staffMember),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateStaff = async (
  id: string,
  staffMember: StaffMember
): Promise<StaffMember> => {
  try {
    const response = await fetch(`/api/staff/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staffMember),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteStaff = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/staff/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    handleApiError(error);
  }
};
