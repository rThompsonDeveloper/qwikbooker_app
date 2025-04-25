import { ErrorState } from "./ErrorContext";

export type ErrorAction =
  | { type: "ADD_ERROR"; payload: ErrorState }
  | { type: "REMOVE_ERROR"; payload: string }
  | { type: "CLEAR_ERRORS" };

export const errorReducer = (
  state: ErrorState[],
  action: ErrorAction
): ErrorState[] => {
  switch (action.type) {
    case "ADD_ERROR":
      // Remove any existing errors with the same message to prevent duplicates
      const filteredState = state.filter(
        (error) => error.message !== action.payload.message
      );
      return [...filteredState, action.payload];
    case "REMOVE_ERROR":
      return state.filter((error) => error.id !== action.payload);
    case "CLEAR_ERRORS":
      return [];
    default:
      return state;
  }
};

// Action creators
export const addError = (error: ErrorState): ErrorAction => ({
  type: "ADD_ERROR",
  payload: error,
});

export const removeError = (id: string): ErrorAction => ({
  type: "REMOVE_ERROR",
  payload: id,
});

export const clearErrors = (): ErrorAction => ({
  type: "CLEAR_ERRORS",
});
