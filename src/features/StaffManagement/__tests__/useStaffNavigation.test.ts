import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useNavigate } from "react-router-dom";
import { StaffMember } from "../context/StaffContext";

// Mock the hook
vi.mock("react-router-dom");

describe("useStaffNavigation", () => {
  const mockNavigate = vi.fn();
  const mockStaffMember: StaffMember = {
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
  };

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  it("should navigate to staff member view with id", () => {
    const { result } = renderHook(() => useStaffNavigation());

    result.current.navigateToStaffMember("1");
    expect(mockNavigate).toHaveBeenCalledWith("/staff/1");

    result.current.navigateToStaffMember(mockStaffMember);
    expect(mockNavigate).toHaveBeenCalledWith("/staff/1");
  });

  it("should navigate to staff member edit with id", () => {
    const { result } = renderHook(() => useStaffNavigation());

    result.current.navigateToEditStaff("1");
    expect(mockNavigate).toHaveBeenCalledWith("/staff/1/edit");

    result.current.navigateToEditStaff(mockStaffMember);
    expect(mockNavigate).toHaveBeenCalledWith("/staff/1/edit");
  });

  it("should navigate to staff list", () => {
    const { result } = renderHook(() => useStaffNavigation());

    result.current.navigateToStaffList();
    expect(mockNavigate).toHaveBeenCalledWith("/staff");
  });
});
