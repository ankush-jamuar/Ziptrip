import * as todoService from '../services/todo.service.js';

/**
 * GET /api/todos
 * Returns all todos sorted by newest first.
 */
export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/todos/:id
 * Returns a single todo by ID.
 */
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/todos
 * Creates a new todo. Title is required.
 */
export const createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json({
      success: true,
      message: 'Todo created successfully.',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/todos/:id
 * Updates an existing todo. All fields are optional.
 */
export const updateTodo = async (req, res, next) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Todo updated successfully.',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/todos/:id
 * Deletes a todo by ID.
 */
export const deleteTodo = async (req, res, next) => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
