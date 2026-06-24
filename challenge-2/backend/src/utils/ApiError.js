/**
 * Custom application error class.
 * Allows throwing errors with a specific HTTP status code
 * that the centralized error handler can use.
 */
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
    // Maintains proper stack trace in V8
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request') {
    return new ApiError(400, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static internal(message = 'Internal Server Error') {
    return new ApiError(500, message);
  }
}
