// Error Types
export enum ErrorType {
  VALIDATION = "VALIDATION",
  NETWORK = "NETWORK",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
}

// Backend API Error Response
export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  code?: string;
  details?: unknown;
}

// Application Error
export interface AppError {
  type: ErrorType;
  message: string;
  statusCode?: number;
  code?: string;
  details?: unknown;
}

// Error Messages
export const ERROR_MESSAGES = {
  [ErrorType.VALIDATION]: "Validation error occurred",
  [ErrorType.NETWORK]: "Network error occurred",
  [ErrorType.AUTHENTICATION]: "Authentication error occurred",
  [ErrorType.AUTHORIZATION]: "Authorization error occurred",
  [ErrorType.NOT_FOUND]: "Resource not found",
  [ErrorType.SERVER]: "Server error occurred",
  [ErrorType.UNKNOWN]: "An unknown error occurred",
} as const;
