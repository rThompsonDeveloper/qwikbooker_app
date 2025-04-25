import axios from "axios";
import { AppError, ErrorType, ApiErrorResponse } from "./types";

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiErrorResponse;

    if (apiError) {
      const type = getErrorType(apiError.statusCode);
      throw {
        type,
        message: apiError.message,
        statusCode: apiError.statusCode,
        code: apiError.code,
        details: apiError.details,
      } as AppError;
    }

    // Handle network errors
    if (error.code === "ECONNABORTED") {
      throw {
        type: ErrorType.NETWORK,
        message: "Request timed out",
      } as AppError;
    }
  }

  // Handle HTTP errors
  if (error instanceof Error && error.message.includes("HTTP error!")) {
    const statusCode = parseInt(error.message.split("status: ")[1]);
    throw {
      type: getErrorType(statusCode),
      message: error.message,
      statusCode,
    } as AppError;
  }

  // Handle unknown errors
  throw {
    type: ErrorType.UNKNOWN,
    message: "An unexpected error occurred",
    details: error,
  } as AppError;
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
