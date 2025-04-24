import { describe, it, expect } from "vitest";
import {
  staffReducer,
  initialState,
  setLoading,
  setError,
  setStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  StaffState,
} from "../reducers/staffReducer";
import { StaffMember } from "../context/StaffContext";

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

describe("staffReducer", () => {
  it("should handle SET_LOADING", () => {
    const state = staffReducer(initialState, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it("should handle SET_ERROR", () => {
    const error = "An error occurred";
    const state = staffReducer(initialState, setError(error));
    expect(state.error).toBe(error);
  });

  it("should handle SET_STAFF", () => {
    const staff = [mockStaffMember];
    const state = staffReducer(initialState, setStaff(staff));
    expect(state.staff).toEqual(staff);
  });

  it("should handle ADD_STAFF", () => {
    const state = staffReducer(initialState, addStaff(mockStaffMember));
    expect(state.staff).toContainEqual(mockStaffMember);
  });

  it("should handle UPDATE_STAFF", () => {
    const initialStateWithStaff: StaffState = {
      ...initialState,
      staff: [mockStaffMember],
    };
    const updatedStaff = {
      ...mockStaffMember,
      firstName: "Jane",
    };
    const state = staffReducer(
      initialStateWithStaff,
      updateStaff(updatedStaff)
    );
    expect(state.staff[0].firstName).toBe("Jane");
  });

  it("should handle DELETE_STAFF", () => {
    const initialStateWithStaff: StaffState = {
      ...initialState,
      staff: [mockStaffMember],
    };
    const state = staffReducer(initialStateWithStaff, deleteStaff("1"));
    expect(state.staff).toHaveLength(0);
  });

  it("should return initial state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION", payload: undefined } as any;
    const state = staffReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
