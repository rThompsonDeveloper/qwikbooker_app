import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { v4 as uuid } from "uuid";
import {
  errorReducer,
  addError,
  removeError,
  clearErrors,
} from "./errorReducer";

export interface ErrorState {
  id: string;
  message: string;
  type: "error" | "warning" | "info";
  timestamp: number;
}

interface ErrorContextType {
  errors: ErrorState[];
  addError: (message: string, type?: ErrorState["type"]) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

const initialState: ErrorState[] = [];

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [errors, dispatch] = useReducer(errorReducer, initialState);

  const handleAddError = (
    message: string,
    type: ErrorState["type"] = "error"
  ) => {
    const id = uuid();
    const timestamp = Date.now();
    dispatch(addError({ id, message, type, timestamp }));

    // Auto-remove error after 5 seconds
    setTimeout(() => {
      dispatch(removeError(id));
    }, 5000);
  };

  const handleRemoveError = (id: string) => {
    dispatch(removeError(id));
  };

  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  return (
    <ErrorContext.Provider
      value={{
        errors,
        addError: handleAddError,
        removeError: handleRemoveError,
        clearErrors: handleClearErrors,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
