import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useStaffData } from "../hooks/useStaffData";
import { useStaff } from "../context/StaffContext";
import { useParams } from "react-router-dom";
import { StaffMember } from "../types";

// Mock the hooks
vi.mock("../context/StaffContext");
vi.mock("react-router-dom");

describe("useStaffData", () => {
  const mockStaff: StaffMember[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      role: "staff",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        country: "US",
      },
      status: "active",
      joinDate: "2023-01-01",
    },
  ];

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: undefined });
    vi.mocked(useStaff).mockReturnValue({
      staff: mockStaff,
      loading: true,
      error: null,
      currentPage: 1,
      hasMore: true,
      fetchStaff: vi.fn(),
      searchStaff: vi.fn(),
      editStaff: vi.fn(),
      createStaff: vi.fn(),
      removeStaff: vi.fn(),
      getStaffMember: vi.fn(),
      currentStaff: null,
    });
  });

  it("should fetch staff data on mount", async () => {
    const { result } = renderHook(() => useStaffData());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("should return current staff member when id is provided", () => {
    vi.mocked(useParams).mockReturnValue({ id: "1" });
    const { result } = renderHook(() => useStaffData());
    expect(result.current.currentStaffMember).toBeDefined();
  });

  it("should return undefined for current staff member when id is not found", () => {
    vi.mocked(useParams).mockReturnValue({ id: "999" });
    const { result } = renderHook(() => useStaffData());
    expect(result.current.currentStaffMember).toBeUndefined();
  });

  it("should handle staff member lookup by id", () => {
    const { result } = renderHook(() => useStaffData());
    const staffMember = result.current.getStaffMemberById("1");
    expect(staffMember).toBeDefined();
    expect(staffMember?.id).toBe("1");
  });
});
