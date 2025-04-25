import { useError } from "@/context/ErrorContext";
import { AppError, ErrorType } from "./types";

export const useErrorHandler = () => {
  const { addError } = useError();

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      addError(error.message, getErrorType(error));
    } else {
      addError("An unexpected error occurred", "error");
    }
  };

  const getErrorType = (error: Error): "error" | "warning" | "info" => {
    if (error.name === "ValidationError") return "warning";
    if (error.name === "NetworkError") return "error";
    if (error.name === "AuthenticationError") return "warning";
    if (error.name === "AuthorizationError") return "warning";
    if (error.name === "NotFoundError") return "info";
    return "error";
  };

  return {
    handleError,
  };
};
