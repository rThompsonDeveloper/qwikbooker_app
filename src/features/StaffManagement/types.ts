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
  status: "active" | "pending" | "inactive";
  joinDate: string;
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
  ADD_STAFF = "ADD_STAFF",
  UPDATE_STAFF = "UPDATE_STAFF",
  DELETE_STAFF = "DELETE_STAFF",
}

export interface StaffState {
  staff: StaffMember[];
  loading: boolean;
  error: string | null;
}

export type StaffAction =
  | { type: StaffActionTypes.SET_LOADING; payload: boolean }
  | { type: StaffActionTypes.SET_ERROR; payload: string | null }
  | { type: StaffActionTypes.SET_STAFF; payload: StaffMember[] }
  | { type: StaffActionTypes.ADD_STAFF; payload: StaffMember }
  | { type: StaffActionTypes.UPDATE_STAFF; payload: StaffMember }
  | { type: StaffActionTypes.DELETE_STAFF; payload: string };

// Context Types
export interface StaffContextType extends StaffState {
  fetchStaff: () => Promise<void>;
  createStaff: (staff: Omit<StaffMember, "id">) => Promise<void>;
  editStaff: (id: string, updates: Partial<StaffMember>) => Promise<void>;
  removeStaff: (id: string) => Promise<void>;
}
