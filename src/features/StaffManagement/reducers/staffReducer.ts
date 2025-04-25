import {
  StaffMember,
  StaffState,
  StaffActionTypes,
  StaffAction,
} from "../types";
import { staffApi } from "../services/api/Staff";

// Action Creators
export const setLoading = (loading: boolean) => ({
  type: StaffActionTypes.SET_LOADING as const,
  payload: loading,
});

export const setError = (error: string | null) => ({
  type: StaffActionTypes.SET_ERROR as const,
  payload: error,
});

export const setStaff = (staff: StaffMember[]) => ({
  type: StaffActionTypes.SET_STAFF as const,
  payload: staff,
});

export const addStaff = (staff: StaffMember) => ({
  type: StaffActionTypes.ADD_STAFF as const,
  payload: staff,
});

export const updateStaff = (staff: StaffMember) => ({
  type: StaffActionTypes.UPDATE_STAFF as const,
  payload: staff,
});

export const deleteStaff = (id: string) => ({
  type: StaffActionTypes.DELETE_STAFF as const,
  payload: id,
});

// Initial State
export const initialState: StaffState = {
  staff: [],
  loading: false,
  error: null,
};

// Reducer
export const staffReducer = (
  state: StaffState = initialState,
  action: StaffAction
): StaffState => {
  switch (action.type) {
    case StaffActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case StaffActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case StaffActionTypes.SET_STAFF:
      return { ...state, staff: action.payload };
    case StaffActionTypes.ADD_STAFF:
      return { ...state, staff: [...state.staff, action.payload] };
    case StaffActionTypes.UPDATE_STAFF:
      return {
        ...state,
        staff: state.staff.map((member) =>
          member.id === action.payload.id ? action.payload : member
        ),
      };
    case StaffActionTypes.DELETE_STAFF:
      return {
        ...state,
        staff: state.staff.filter((member) => member.id !== action.payload),
      };
    default:
      return state;
  }
};

// Thunk Actions
export const fetchStaff = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const staff = await staffApi.getStaff();
    dispatch(setStaff(staff));
  } catch (error) {
    dispatch(
      setError(error instanceof Error ? error.message : "An error occurred")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const createStaff =
  (staff: Omit<StaffMember, "id">) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const newStaff = await staffApi.createStaff(staff);
      dispatch(addStaff(newStaff));
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : "An error occurred")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const editStaff =
  (id: string, updates: Partial<StaffMember>) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const updatedStaff = await staffApi.updateStaff(id, updates);
      dispatch(updateStaff(updatedStaff));
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : "An error occurred")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const removeStaff = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await staffApi.deleteStaff(id);
    dispatch(deleteStaff(id));
  } catch (error) {
    dispatch(
      setError(error instanceof Error ? error.message : "An error occurred")
    );
  } finally {
    dispatch(setLoading(false));
  }
};
