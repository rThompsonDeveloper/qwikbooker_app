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
      } catch (error) {
        const appError = AppErrorHandler.handleError(error);
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: appError.message,
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
      } catch (error) {
        const appError = AppErrorHandler.handleError(error);
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: appError.message,
        });
      } finally {
        dispatch({ type: StaffActionTypes.SET_LOADING, payload: false });
      }
    },
    [] // No dependencies needed since we're using dispatch directly
  );

  const createStaff = useCallback(
    async (staff: Omit<StaffMember, "id">) => {
      try {
        dispatch({ type: StaffActionTypes.SET_ERROR, payload: null });
        const newStaff = await staffApi.createStaff(staff);
        dispatch({ type: StaffActionTypes.ADD_STAFF, payload: newStaff });
      } catch (error) {
        const appError = AppErrorHandler.handleError(error);
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: appError.message,
        });
      }
    },
    [] // No dependencies needed since we're using dispatch directly
  );

  const editStaff = useCallback(
    async (id: string, staff: Partial<StaffMember>) => {
      try {
        dispatch({ type: StaffActionTypes.SET_ERROR, payload: null });
        const updatedStaff = await staffApi.updateStaff(id, staff);
        dispatch({
          type: StaffActionTypes.UPDATE_STAFF,
          payload: updatedStaff,
        });
      } catch (error) {
        const appError = AppErrorHandler.handleError(error);
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: appError.message,
        });
      }
    },
    [] // No dependencies needed since we're using dispatch directly
  );

  const removeStaff = useCallback(
    async (id: string) => {
      try {
        dispatch({ type: StaffActionTypes.SET_ERROR, payload: null });
        await staffApi.deleteStaff(id);
        dispatch({ type: StaffActionTypes.DELETE_STAFF, payload: id });
      } catch (error) {
        const appError = AppErrorHandler.handleError(error);
        dispatch({
          type: StaffActionTypes.SET_ERROR,
          payload: appError.message,
        });
      }
    },
    [] // No dependencies needed since we're using dispatch directly
  );

  return (
    <StaffContext.Provider
      value={{
        staff: state.staff,
        loading: state.loading,
        error: state.error,
        currentPage: state.currentPage,
        hasMore: state.hasMore,
        fetchStaff,
        searchStaff,
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
