import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import StaffManager from "../StaffManager";
import { useStaffData } from "../hooks/useStaffData";
import { useStaffNavigation } from "../hooks/useStaffNavigation";
import { StaffMember } from "../types";
import StaffList from "../components/StaffList";

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  Routes: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Route: ({ element }: { element: React.ReactNode }) => element,
  Outlet: () => <StaffList />,
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
}));

// Mock the hooks and components
vi.mock("../hooks/useStaffData");
vi.mock("../hooks/useStaffNavigation");
vi.mock("../components/StaffList", () => ({
  __esModule: true,
  default: () => <div>Mock StaffList</div>,
}));

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

describe("StaffManager", () => {
  beforeEach(() => {
    vi.mocked(useStaffNavigation).mockReturnValue({
      navigateToStaffList: vi.fn(),
      navigateToStaffMember: vi.fn(),
      navigateToEditStaff: vi.fn(),
    });

    vi.mocked(useStaffData).mockReturnValue({
      staff: [mockStaffMember],
      loading: false,
      error: null,
      currentStaffMember: mockStaffMember,
      getStaffMemberById: vi.fn(),
      editStaff: vi.fn(),
      loadMore: vi.fn(),
      search: vi.fn(),
      isLoading: false,
      hasMore: true,
    });
  });

  it("should render the staff management header", () => {
    const { getByText } = render(<StaffManager />);
    expect(getByText("Staff Management")).toBeInTheDocument();
  });

  it("should render the staff list", () => {
    const { getByText } = render(<StaffManager />);
    expect(getByText("Mock StaffList")).toBeInTheDocument();
  });
});
