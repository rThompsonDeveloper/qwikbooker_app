import { renderHook } from "@testing-library/react";
import { useStaffFormatting } from "../hooks/useStaffFormatting";
import { StaffMember } from "../context/StaffContext";

describe("useStaffFormatting", () => {
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

  it("should return correct status colors", () => {
    const { result } = renderHook(() => useStaffFormatting());

    expect(result.current.getStatusColor("active")).toContain("green");
    expect(result.current.getStatusColor("pending")).toContain("yellow");
    expect(result.current.getStatusColor("inactive")).toContain("red");
    expect(result.current.getStatusColor("unknown")).toContain("gray");
  });

  it("should format roles correctly", () => {
    const { result } = renderHook(() => useStaffFormatting());

    expect(result.current.formatRole("admin")).toBe("Admin");
    expect(result.current.formatRole("store manager")).toBe("Store Manager");
    expect(result.current.formatRole("staff")).toBe("Staff");
    expect(result.current.formatRole("unknown")).toBe("unknown");
  });

  it("should format status correctly", () => {
    const { result } = renderHook(() => useStaffFormatting());

    expect(result.current.formatStatus("active")).toBe("Active");
    expect(result.current.formatStatus("pending")).toBe("Pending");
    expect(result.current.formatStatus("inactive")).toBe("Inactive");
  });

  it("should format full name correctly", () => {
    const { result } = renderHook(() => useStaffFormatting());

    expect(result.current.formatFullName(mockStaffMember)).toBe("John Doe");
  });

  it("should format address correctly", () => {
    const { result } = renderHook(() => useStaffFormatting());

    expect(result.current.formatAddress(mockStaffMember)).toBe(
      "123 Main St, Anytown, CA 12345"
    );
  });
});
