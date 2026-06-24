import { ApiError } from '../utils/ApiError.js';

const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

/**
 * Validates the request body for creating a new todo.
 * Title is required; all other fields are optional with type checks.
 */
export const validateCreateTodo = (req, res, next) => {
  const { title, priority, dueDate } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return next(ApiError.badRequest('Title is required and must be a non-empty string.'));
  }

  if (title.trim().length > 255) {
    return next(ApiError.badRequest('Title must not exceed 255 characters.'));
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return next(
      ApiError.badRequest(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}.`)
    );
  }

  if (dueDate !== undefined && dueDate !== null) {
    const parsed = new Date(dueDate);
    if (isNaN(parsed.getTime())) {
      return next(ApiError.badRequest('dueDate must be a valid ISO 8601 date string.'));
    }
  }

  // Sanitize title before passing to controller
  req.body.title = title.trim();

  next();
};

/**
 * Validates the request body for updating an existing todo.
 * All fields are optional, but any provided field must be valid.
 */
export const validateUpdateTodo = (req, res, next) => {
  const { title, priority, completed, dueDate } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return next(ApiError.badRequest('Title must be a non-empty string.'));
    }
    if (title.trim().length > 255) {
      return next(ApiError.badRequest('Title must not exceed 255 characters.'));
    }
    req.body.title = title.trim();
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return next(
      ApiError.badRequest(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}.`)
    );
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return next(ApiError.badRequest('completed must be a boolean.'));
  }

  if (dueDate !== undefined && dueDate !== null) {
    const parsed = new Date(dueDate);
    if (isNaN(parsed.getTime())) {
      return next(ApiError.badRequest('dueDate must be a valid ISO 8601 date string.'));
    }
  }

  next();
};
