import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import {
  staffReducer,
  initialState,
  StaffState,
  StaffActionTypes,
} from "../reducers/staffReducer";
import { staffApi } from "../services/api/Staff";

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

interface StaffContextType extends StaffState {
  fetchStaff: () => Promise<void>;
  createStaff: (staff: Omit<StaffMember, "id">) => Promise<void>;
  editStaff: (id: string, updates: Partial<StaffMember>) => Promise<void>;
  removeStaff: (id: string) => Promise<void>;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(staffReducer, initialState);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: StaffActionTypes.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: StaffActionTypes.SET_ERROR, payload: error });
  }, []);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const staff = await staffApi.getStaff();
      dispatch({ type: StaffActionTypes.SET_STAFF, payload: staff });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError]);

  const createStaff = useCallback(
    async (staff: Omit<StaffMember, "id">) => {
      try {
        setError(null);
        const newStaff = await staffApi.createStaff(staff);
        dispatch({ type: StaffActionTypes.ADD_STAFF, payload: newStaff });
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        throw error;
      }
    },
    [setError]
  );

  const editStaff = useCallback(
    async (id: string, updates: Partial<StaffMember>) => {
      try {
        setError(null);
        const updatedStaff = await staffApi.updateStaff(id, updates);
        dispatch({
          type: StaffActionTypes.UPDATE_STAFF,
          payload: updatedStaff,
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        throw error;
      }
    },
    [setError]
  );

  const removeStaff = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await staffApi.deleteStaff(id);
        dispatch({ type: StaffActionTypes.DELETE_STAFF, payload: id });
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        throw error;
      }
    },
    [setError]
  );

  return (
    <StaffContext.Provider
      value={{
        ...state,
        fetchStaff,
        createStaff,
        editStaff,
        removeStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};
