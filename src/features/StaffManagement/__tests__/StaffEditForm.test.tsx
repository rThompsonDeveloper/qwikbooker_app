import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { StaffMember } from "../context/StaffContext";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { useStaffForm } from "../hooks/useStaffForm";
import { useParams } from "react-router-dom";
import StaffEditForm from "../forms/StaffEditForm";

// Mock the hooks
vi.mock("../hooks/useStaffData");
vi.mock("../hooks/useStaffNavigation");
vi.mock("../hooks/useStaffForm");
vi.mock("react-router-dom");

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

describe("StaffEditForm", () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: "1" });
    vi.mocked(useStaffData).mockReturnValue({
      staff: [mockStaffMember],
      loading: false,
      error: null,
      currentStaffMember: mockStaffMember,
      getStaffMemberById: vi.fn(),
      editStaff: vi.fn(),
    });

    vi.mocked(useStaffNavigation).mockReturnValue({
      navigateToStaffList: vi.fn(),
      navigateToStaffMember: vi.fn(),
      navigateToEditStaff: vi.fn(),
    });

    vi.mocked(useStaffForm).mockReturnValue({
      register: vi.fn().mockReturnValue({ name: "phoneNumber" }),
      handleSubmit: vi.fn(),
      errors: {},
      isSubmitting: false,
    });
  });

  it("should handle form submission with updated data", async () => {
    const mockEditStaff = vi.fn();
    const mockHandleSubmit = vi.fn().mockImplementation((callback) => callback);

    vi.mocked(useStaffData).mockReturnValue({
      staff: [mockStaffMember],
      loading: false,
      error: null,
      currentStaffMember: mockStaffMember,
      getStaffMemberById: vi.fn(),
      editStaff: mockEditStaff,
    });

    vi.mocked(useStaffForm).mockReturnValue({
      register: vi.fn().mockReturnValue({ name: "phoneNumber" }),
      handleSubmit: mockHandleSubmit,
      errors: {},
      isSubmitting: false,
    });

    const { getByRole } = render(<StaffEditForm />);
    const submitButton = getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  it("should show error message when staff member is not found", () => {
    vi.mocked(useStaffData).mockReturnValue({
      staff: [],
      loading: false,
      error: null,
      currentStaffMember: undefined,
      getStaffMemberById: vi.fn(),
      editStaff: vi.fn(),
    });

    render(<StaffEditForm />);
    expect(screen.getByText("Staff member not found")).toBeInTheDocument();
  });
});
