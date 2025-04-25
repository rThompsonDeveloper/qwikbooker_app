import axios from "axios";
import { AppError, ErrorType, ERROR_MESSAGES, ApiErrorResponse } from "./types";
import { useError } from "@/context/ErrorContext";

export class AppErrorHandler {
  static createError(
    type: ErrorType,
    message?: string,
    details?: unknown
  ): AppError {
    return {
      type,
      message: message || ERROR_MESSAGES[type],
      details,
    };
  }

  static isAppError(error: unknown): error is AppError {
    return (
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      "message" in error
    );
  }
}

export const useAppErrorHandler = () => {
  const { addError } = useError();

  const handleError = (error: unknown): AppError => {
    if (error instanceof Error) {
      // Handle known error types
      if (error.name === "ValidationError") {
        addError(error.message, "warning");
        return AppErrorHandler.createError(ErrorType.VALIDATION, error.message);
      }
      if (error.name === "NetworkError") {
        addError(error.message, "error");
        return AppErrorHandler.createError(ErrorType.NETWORK, error.message);
      }
      if (error.name === "AuthenticationError") {
        addError(error.message, "warning");
        return AppErrorHandler.createError(
          ErrorType.AUTHENTICATION,
          error.message
        );
      }
      if (error.name === "AuthorizationError") {
        addError(error.message, "warning");
        return AppErrorHandler.createError(
          ErrorType.AUTHORIZATION,
          error.message
        );
      }
      if (error.name === "NotFoundError") {
        addError(error.message, "info");
        return AppErrorHandler.createError(ErrorType.NOT_FOUND, error.message);
      }
    }

    // Handle unknown errors
    addError("An unexpected error occurred", "error");
    return AppErrorHandler.createError(
      ErrorType.UNKNOWN,
      "An unexpected error occurred",
      error
    );
  };

  return {
    handleError,
  };
};

export const useApiErrorHandler = () => {
  const { handleError } = useAppErrorHandler();
  const { addError } = useError();

  const handleApiError = (error: unknown): AppError => {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as ApiErrorResponse;

      if (apiError) {
        const type = getErrorType(apiError.statusCode);
        addError(
          apiError.message,
          type === ErrorType.VALIDATION ? "warning" : "error"
        );
        return {
          type,
          message: apiError.message,
          statusCode: apiError.statusCode,
          code: apiError.code,
          details: apiError.details,
        };
      }

      // Handle network errors
      if (error.code === "ECONNABORTED") {
        addError("Request timed out", "error");
        return AppErrorHandler.createError(
          ErrorType.NETWORK,
          "Request timed out"
        );
      }
    }

    // Fallback to generic error handling
    return handleError(error);
  };

  const getErrorType = (statusCode: number): ErrorType => {
    switch (statusCode) {
      case 400:
        return ErrorType.VALIDATION;
      case 401:
        return ErrorType.AUTHENTICATION;
      case 403:
        return ErrorType.AUTHORIZATION;
      case 404:
        return ErrorType.NOT_FOUND;
      case 500:
        return ErrorType.SERVER;
      default:
        return ErrorType.UNKNOWN;
    }
  };

  return {
    handleApiError,
  };
};
