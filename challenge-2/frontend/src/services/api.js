import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor — unwrap data.data for clean consumption
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

// ─── Todo API Methods ──────────────────────────────────────────────────────────

export const getTodos = () => api.get('/todos');

export const getTodoById = (id) => api.get(`/todos/${id}`);

export const createTodo = (data) => api.post('/todos', data);

export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);

export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export default api;
