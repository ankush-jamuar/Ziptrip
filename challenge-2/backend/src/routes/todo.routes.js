import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller.js';
import {
  validateCreateTodo,
  validateUpdateTodo,
} from '../middleware/validateTodo.js';

const router = Router();

// GET    /api/todos       — List all todos
router.get('/', getAllTodos);

// GET    /api/todos/:id   — Get single todo
router.get('/:id', getTodoById);

// POST   /api/todos       — Create new todo
router.post('/', validateCreateTodo, createTodo);

// PUT    /api/todos/:id   — Update existing todo
router.put('/:id', validateUpdateTodo, updateTodo);

// DELETE /api/todos/:id   — Delete todo
router.delete('/:id', deleteTodo);

export default router;
