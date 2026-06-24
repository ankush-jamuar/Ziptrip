import prisma from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Retrieves all todos, ordered by creation date descending (newest first).
 */
export const getAllTodos = async () => {
  return prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Retrieves a single todo by ID.
 * Throws a 404 ApiError if the todo does not exist.
 */
export const getTodoById = async (id) => {
  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo) {
    throw ApiError.notFound(`Todo with ID "${id}" was not found.`);
  }

  return todo;
};

/**
 * Creates a new todo with the provided data.
 * The completedAt field is only set if the todo is created as completed (edge case).
 */
export const createTodo = async (data) => {
  const { title, description, priority, category, dueDate, completed } = data;

  return prisma.todo.create({
    data: {
      title,
      description: description?.trim() || null,
      priority: priority || 'MEDIUM',
      category: category?.trim() || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: completed ?? false,
      completedAt: completed ? new Date() : null,
    },
  });
};

/**
 * Updates an existing todo by ID.
 *
 * Handles completedAt automatically:
 * - If completed transitions true  → sets completedAt to now
 * - If completed transitions false → clears completedAt to null
 * - If completed is not in the update → leaves completedAt unchanged
 */
export const updateTodo = async (id, data) => {
  // Verify the record exists before updating
  const existing = await getTodoById(id);

  const updateData = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description?.trim() || null;
  if (data.priority !== undefined) updateData.priority = data.priority;
  if (data.category !== undefined) updateData.category = data.category?.trim() || null;
  if (data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;

  if (data.completed !== undefined) {
    updateData.completed = data.completed;

    if (data.completed === true && !existing.completed) {
      // Transition: active → completed
      updateData.completedAt = new Date();
    } else if (data.completed === false && existing.completed) {
      // Transition: completed → active
      updateData.completedAt = null;
    }
  }

  return prisma.todo.update({
    where: { id },
    data: updateData,
  });
};

/**
 * Deletes a todo by ID.
 * Throws a 404 ApiError if the todo does not exist.
 */
export const deleteTodo = async (id) => {
  // Verify existence first to return a proper 404 before Prisma throws P2025
  await getTodoById(id);

  return prisma.todo.delete({ where: { id } });
};
