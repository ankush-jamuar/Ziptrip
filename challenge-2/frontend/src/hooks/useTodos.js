import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as api from '../services/api';

/**
 * useTodos — central data management hook for the Dashboard.
 *
 * Returns todos state, loading/error flags, filter/search state,
 * and all CRUD mutation functions.
 */
export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // ─── Fetch all todos ─────────────────────────────────────────────────────
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getTodos();
      setTodos(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ─── Derived: filtered + searched todos ─────────────────────────────────
  const filteredTodos = todos
    .filter((todo) => {
      if (activeFilter === 'active') return !todo.completed;
      if (activeFilter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(q) ||
        (todo.description && todo.description.toLowerCase().includes(q)) ||
        (todo.category && todo.category.toLowerCase().includes(q))
      );
    });

  // ─── Stats derived from all todos (not filtered) ─────────────────────────
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
    highPriority: todos.filter((t) => t.priority === 'HIGH' && !t.completed).length,
  };

  // ─── Create ──────────────────────────────────────────────────────────────
  const createTodo = async (data) => {
    const toastId = toast.loading('Creating task...');
    try {
      const response = await api.createTodo(data);
      setTodos((prev) => [response.data.data, ...prev]);
      toast.success('Task created successfully!', { id: toastId });
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Failed to create task.', { id: toastId });
      return { success: false };
    }
  };

  // ─── Update ──────────────────────────────────────────────────────────────
  const updateTodo = async (id, data) => {
    const toastId = toast.loading('Updating task...');
    try {
      const response = await api.updateTodo(id, data);
      const updated = response.data.data;
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success('Task updated successfully!', { id: toastId });
      return { success: true, data: updated };
    } catch (err) {
      toast.error(err.message || 'Failed to update task.', { id: toastId });
      return { success: false };
    }
  };

  // ─── Delete ──────────────────────────────────────────────────────────────
  const deleteTodo = async (id) => {
    const toastId = toast.loading('Deleting task...');
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success('Task deleted.', { id: toastId });
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Failed to delete task.', { id: toastId });
      return { success: false };
    }
  };

  // ─── Toggle Complete ─────────────────────────────────────────────────────
  const toggleComplete = async (todo) => {
    const newCompleted = !todo.completed;
    try {
      const response = await api.updateTodo(todo.id, { completed: newCompleted });
      const updated = response.data.data;
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
      toast.success(
        newCompleted ? '✓ Marked as completed!' : 'Moved back to active.',
        { duration: 2000 }
      );
    } catch (err) {
      toast.error(err.message || 'Failed to update status.');
    }
  };

  return {
    todos,
    filteredTodos,
    stats,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
};
