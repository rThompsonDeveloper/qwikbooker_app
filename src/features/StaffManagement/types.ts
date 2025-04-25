// Staff Member Types
export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "store manager" | "staff";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  assignedStore?: {
    id: string;
    name: string;
  };
  status: "active" | "inactive" | "pending";
  joinDate: string;
}

export interface Store {
  id: string;
  name: string;
}

// Form Types
export type StaffMemberFormData = Omit<StaffMember, "id">;

export interface FormOption {
  value: string;
  label: string;
}

export interface UseStaffFormProps {
  staff: StaffMember[];
  onSubmit: (data: StaffMemberFormData) => Promise<void>;
  memberId?: string;
}

// Redux/Context Types
export enum StaffActionTypes {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_STAFF = "SET_STAFF",
  APPEND_STAFF = "APPEND_STAFF",
  ADD_STAFF = "ADD_STAFF",
  UPDATE_STAFF = "UPDATE_STAFF",
  DELETE_STAFF = "DELETE_STAFF",
  SET_CURRENT_STAFF = "SET_CURRENT_STAFF",
}

export interface StaffState {
  staff: StaffMember[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  currentStaff: StaffMember | null;
}

export type StaffAction =
  | { type: StaffActionTypes.SET_LOADING; payload: boolean }
  | { type: StaffActionTypes.SET_ERROR; payload: string | null }
  | { type: StaffActionTypes.SET_STAFF; payload: StaffMember[] }
  | {
      type: StaffActionTypes.APPEND_STAFF;
      payload: { staff: StaffMember[]; page: number };
    }
  | { type: StaffActionTypes.ADD_STAFF; payload: StaffMember }
  | { type: StaffActionTypes.UPDATE_STAFF; payload: StaffMember }
  | { type: StaffActionTypes.DELETE_STAFF; payload: string }
  | { type: StaffActionTypes.SET_CURRENT_STAFF; payload: StaffMember };

// Context Types
export interface StaffContextType extends StaffState {
  fetchStaff: (page?: number) => Promise<void>;
  searchStaff: (query: string) => Promise<void>;
  getStaffMember: (id: string) => Promise<void>;
  editStaff: (
    id: string,
    updates: Partial<StaffMember>
  ) => Promise<StaffMember>;
  createStaff: (staff: Omit<StaffMember, "id">) => Promise<StaffMember>;
  removeStaff: (id: string) => Promise<StaffMember>;
}
