import { ApiError } from '../utils/ApiError.js';

/**
 * Centralized error handling middleware.
 * Must be the last middleware registered in server.js.
 *
 * Handles:
 * - ApiError instances (known operational errors)
 * - Prisma P2025 errors (record not found)
 * - Prisma P2002 errors (unique constraint violation)
 * - Unexpected errors (generic 500)
 */
export const errorHandler = (err, req, res, next) => {
  // Log to console in development for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${err.name}: ${err.message}`);
  }

  // Known operational error — safe to send message to client
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Prisma: record not found (e.g. findUniqueOrThrow, update, delete on missing ID)
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'The requested record does not exist.',
    });
  }

  // Prisma: unique constraint failed
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'A record with this value already exists.',
    });
  }

  // Catch-all for unexpected errors — do not leak internals
  return res.status(500).json({
    success: false,
    message: 'An unexpected error occurred. Please try again.',
  });
};
