import axios from "axios";
import { StaffMember } from "../../types";
import { mockStaff } from "../../mocks/staffData";
import { ApiErrorHandler } from "@/utils/errors";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const FORCE_PROD_API = import.meta.env.VITE_FORCE_PROD_API === "true";

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
    // Add a small delay to show the skeleton loader
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simulate pagination in dev mode
    const start = (page - 1) * 10;
    const end = start + 10;
    return mockStaff.slice(start, end);
  },

  searchStaff: async (
    query: string,
    page: number = 1
  ): Promise<StaffMember[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const filtered = mockStaff.filter((member) =>
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    const start = (page - 1) * 10;
    const end = start + 10;
    return filtered.slice(start, end);
  },

  getStaffMember: async (id: string): Promise<StaffMember> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const member = mockStaff.find((m) => m.id === id);
    if (!member) {
      throw new Error("Staff member not found");
    }
    return member;
  },

  createStaff: async (staff: Omit<StaffMember, "id">): Promise<StaffMember> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newMember: StaffMember = {
      ...staff,
      id: Math.random().toString(36).substring(2, 11),
    };
    mockStaff.push(newMember);
    return newMember;
  },

  updateStaff: async (
    id: string,
    staff: Partial<StaffMember>
  ): Promise<StaffMember> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockStaff.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error("Staff member not found");
    }
    mockStaff[index] = { ...mockStaff[index], ...staff };
    return mockStaff[index];
  },

  deleteStaff: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockStaff.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error("Staff member not found");
    }
    mockStaff.splice(index, 1);
  },
};

// Production mode API service
const prodApi = {
  getStaff: async (page: number = 1): Promise<StaffMember[]> => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.STAFF}?page=${page}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      return []; // Return empty array on error
    }
  },

  searchStaff: async (
    query: string,
    page: number = 1
  ): Promise<StaffMember[]> => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.STAFF}/search?query=${query}&page=${page}`
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      return [];
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

// Export the appropriate API service based on environment and force prod flag
export const staffApi = FORCE_PROD_API
  ? prodApi
  : import.meta.env.DEV
  ? devApi
  : prodApi;

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
