import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import { staffReducer, initialState } from "../reducers/staffReducer";
import { staffApi } from "../services/api/Staff";
import { StaffMember, StaffContextType, StaffActionTypes } from "../types";
import { useStaffCache } from "../hooks/useStaffCache";

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(staffReducer, initialState);
  const { getStaffMember: getCachedStaffMember, updateStaffMember } =
    useStaffCache();

  const fetchStaff = useCallback(
    async (page: number = 1) => {
      try {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: true });
        dispatch({ type: StaffActionTypes.SET_ERROR, payload: null });
        const newStaff = await staffApi.getStaff(page);
        if (page === 1) {
          dispatch({
            type: StaffActionTypes.SET_STAFF,
            payload: newStaff,
          });
        } else {
          dispatch({
            type: StaffActionTypes.APPEND_STAFF,
            payload: { staff: newStaff, page },
          });
        }
      } catch (error: unknown) {
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: error instanceof Error ? error.message : "An error occurred",
        });
      } finally {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: false });
      }
    },
    [] // No dependencies needed since we're using dispatch directly
  );

  const searchStaff = useCallback(
    async (query: string, page: number = 1) => {
      try {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: true });
        dispatch({ type: StaffActionTypes.SET_ERROR, payload: null });
        const newStaff = await staffApi.searchStaff(query, page);
        dispatch({
          type: StaffActionTypes.SET_STAFF,
          payload: newStaff,
        });
      } catch (error: unknown) {
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: error instanceof Error ? error.message : "An error occurred",
        });
      } finally {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: false });
      }
    },
    [] // No dependencies needed since we're using dispatch directly
  );

  const getStaffMember = useCallback(
    async (id: string) => {
      try {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: true });
        const staff = await getCachedStaffMember(id);
        dispatch({ type: StaffActionTypes.SET_CURRENT_STAFF, payload: staff });
      } catch (error: unknown) {
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: error instanceof Error ? error.message : "An error occurred",
        });
      } finally {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: false });
      }
    },
    [getCachedStaffMember]
  );

  const editStaff = useCallback(
    async (id: string, updates: Partial<StaffMember>): Promise<StaffMember> => {
      try {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: true });
        const updated = await updateStaffMember(id, updates);
        dispatch({
          type: StaffActionTypes.UPDATE_STAFF,
          payload: updated,
        });
        return updated;
      } catch (error: unknown) {
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: error instanceof Error ? error.message : "An error occurred",
        });
        throw error;
      } finally {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: false });
      }
    },
    [updateStaffMember]
  );

  const createStaff = useCallback(
    async (staff: Omit<StaffMember, "id">): Promise<StaffMember> => {
      try {
        dispatch({ type: StaffActionTypes.SET_ERROR, payload: null });
        const newStaff = await staffApi.createStaff(staff);
        dispatch({ type: StaffActionTypes.ADD_STAFF, payload: newStaff });
        return newStaff;
      } catch (error: unknown) {
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: error instanceof Error ? error.message : "An error occurred",
        });
        throw error;
      }
    },
    []
  );

  const removeStaff = useCallback(
    async (id: string): Promise<StaffMember> => {
      try {
        dispatch({ type: StaffActionTypes.SET_ERROR, payload: null });
        const staff = state.staff.find((m) => m.id === id);
        if (!staff) throw new Error("Staff member not found");
        await staffApi.deleteStaff(id);
        dispatch({ type: StaffActionTypes.DELETE_STAFF, payload: id });
        return staff;
      } catch (error: unknown) {
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: error instanceof Error ? error.message : "An error occurred",
        });
        throw error;
      }
    },
    [state.staff]
  );

  return (
    <StaffContext.Provider
      value={{
        staff: state.staff,
        loading: state.loading,
        error: state.error,
        currentPage: state.currentPage,
        hasMore: state.hasMore,
        currentStaff: state.currentStaff,
        fetchStaff,
        searchStaff,
        getStaffMember,
        editStaff,
        createStaff,
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
