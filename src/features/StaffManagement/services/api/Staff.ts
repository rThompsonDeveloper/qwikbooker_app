import axios from "axios";
import { StaffMember } from "../../context/StaffContext";

// Mock data for development
const mockStaff: StaffMember[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    role: "admin",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    assignedStore: {
      id: "store1",
      name: "Downtown Store",
    },
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1 (555) 987-6543",
    role: "store manager",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    assignedStore: {
      id: "store2",
      name: "Uptown Store",
    },
    status: "active",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    phoneNumber: "+1 (555) 456-7890",
    role: "staff",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA",
    },
    assignedStore: {
      id: "store1",
      name: "Downtown Store",
    },
    status: "pending",
    joinDate: "2023-03-10",
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    phoneNumber: "+1 (555) 789-0123",
    role: "staff",
    address: {
      street: "321 Elm St",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      country: "USA",
    },
    status: "inactive",
    joinDate: "2023-04-05",
  },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// API endpoints
const API_ENDPOINTS = {
  STAFF: `${API_BASE_URL}/api/staff`,
  STAFF_MEMBER: (id: string) => `${API_BASE_URL}/api/staff/${id}`,
};

// Development mode API service
const devApi = {
  getStaff: async (): Promise<StaffMember[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStaff;
  },

  getStaffMember: async (id: string): Promise<StaffMember> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const member = mockStaff.find((m) => m.id === id);
    if (!member) throw new Error("Staff member not found");
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
    if (index === -1) throw new Error("Staff member not found");
    mockStaff[index] = { ...mockStaff[index], ...staff };
    return mockStaff[index];
  },

  deleteStaff: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockStaff.findIndex((m) => m.id === id);
    if (index === -1) throw new Error("Staff member not found");
    mockStaff.splice(index, 1);
  },
};

// Production mode API service
const prodApi = {
  getStaff: async (): Promise<StaffMember[]> => {
    const response = await axios.get(API_ENDPOINTS.STAFF);
    return response.data;
  },

  getStaffMember: async (id: string): Promise<StaffMember> => {
    const response = await axios.get(API_ENDPOINTS.STAFF_MEMBER(id));
    return response.data;
  },

  createStaff: async (staff: Omit<StaffMember, "id">): Promise<StaffMember> => {
    const response = await axios.post(API_ENDPOINTS.STAFF, staff);
    return response.data;
  },

  updateStaff: async (
    id: string,
    staff: Partial<StaffMember>
  ): Promise<StaffMember> => {
    const response = await axios.patch(API_ENDPOINTS.STAFF_MEMBER(id), staff);
    return response.data;
  },

  deleteStaff: async (id: string): Promise<void> => {
    await axios.delete(API_ENDPOINTS.STAFF_MEMBER(id));
  },
};

// Export the appropriate API service based on environment
export const staffApi = import.meta.env.DEV ? devApi : prodApi;
