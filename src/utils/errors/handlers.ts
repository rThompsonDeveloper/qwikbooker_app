import axios from "axios";
import { AppError, ErrorType, ERROR_MESSAGES, ApiErrorResponse } from "./types";

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

  static handleError(error: unknown): AppError {
    if (error instanceof Error) {
      // Handle known error types
      if (error.name === "ValidationError") {
        return this.createError(ErrorType.VALIDATION, error.message);
      }
      if (error.name === "NetworkError") {
        return this.createError(ErrorType.NETWORK, error.message);
      }
      if (error.name === "AuthenticationError") {
        return this.createError(ErrorType.AUTHENTICATION, error.message);
      }
      if (error.name === "AuthorizationError") {
        return this.createError(ErrorType.AUTHORIZATION, error.message);
      }
      if (error.name === "NotFoundError") {
        return this.createError(ErrorType.NOT_FOUND, error.message);
      }
    }

    // Handle unknown errors
    return this.createError(
      ErrorType.UNKNOWN,
      "An unexpected error occurred",
      error
    );
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

export class ApiErrorHandler {
  static handleApiError(error: unknown): AppError {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as ApiErrorResponse;

      if (apiError) {
        return {
          type: this.getErrorType(apiError.statusCode),
          message: apiError.message,
          statusCode: apiError.statusCode,
          code: apiError.code,
          details: apiError.details,
        };
      }

      // Handle network errors
      if (error.code === "ECONNABORTED") {
        return AppErrorHandler.createError(
          ErrorType.NETWORK,
          "Request timed out"
        );
      }
    }

    // Fallback to generic error handling
    return AppErrorHandler.handleError(error);
  }

  private static getErrorType(statusCode: number): ErrorType {
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
  }
}
