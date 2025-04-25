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
import { AppErrorHandler } from "@/utils/errors";

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
      const appError = AppErrorHandler.handleError(error);
      setError(appError.message);
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
        const appError = AppErrorHandler.handleError(error);
        setError(appError.message);
        throw appError;
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
        const appError = AppErrorHandler.handleError(error);
        setError(appError.message);
        throw appError;
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
        const appError = AppErrorHandler.handleError(error);
        setError(appError.message);
        throw appError;
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
  if (!context) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};
