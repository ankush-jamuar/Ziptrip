import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  AlertTriangle,
  Calendar,
  Tag,
  Clock,
  CheckCircle2,
  Circle,
  RefreshCw,
  Flame,
  AlertCircle,
} from 'lucide-react';
import { format, isAfter } from 'date-fns';
import toast from 'react-hot-toast';
import * as api from '../services/api';
import TodoForm from '../components/TodoForm';

// ─── Priority config ──────────────────────────────────────────────────────────
const PRIORITY_CONFIG = {
  HIGH: { className: 'badge-high', label: 'High', icon: Flame },
  MEDIUM: { className: 'badge-medium', label: 'Medium', icon: AlertCircle },
  LOW: { className: 'badge-low', label: 'Low', icon: Circle },
};

// ─── Detail Row ───────────────────────────────────────────────────────────────
function DetailRow({ icon: Icon, label, children, highlight }) {
  return (
    <div
      className="flex items-start gap-4 py-4"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-center gap-2 w-36 flex-shrink-0">
        <Icon size={14} className="text-slate-600 flex-shrink-0" />
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <div
        className="text-sm flex-1"
        style={{ color: highlight ? highlight : '#94a3b8' }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────
function DeleteModal({ title, onConfirm, onCancel, isDeleting }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 animate-scale-in"
        style={{
          background: '#0f1729',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
        role="alertdialog"
        aria-modal="true"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(239,68,68,0.1)' }}
        >
          <AlertTriangle size={22} className="text-red-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-100 mb-2">Delete Task?</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          "<span className="text-slate-300 font-medium">{title}</span>" will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <button className="btn-secondary flex-1" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </button>
          <button
            className="btn-danger flex-1"
            onClick={onConfirm}
            disabled={isDeleting}
            id="details-delete-confirm-btn"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TodoDetails Page ─────────────────────────────────────────────────────────
export default function TodoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  // ── Fetch todo ─────────────────────────────────────────────────────────
  const fetchTodo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getTodoById(id);
      setTodo(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  // ── Toggle complete ────────────────────────────────────────────────────
  const handleToggle = async () => {
    if (!todo) return;
    setIsToggling(true);
    try {
      const response = await api.updateTodo(id, { completed: !todo.completed });
      const updated = response.data.data;
      setTodo(updated);
      toast.success(updated.completed ? '✓ Marked as completed!' : 'Moved back to active.', {
        duration: 2000,
      });
    } catch (err) {
      toast.error(err.message || 'Failed to update status.');
    } finally {
      setIsToggling(false);
    }
  };

  // ── Edit submit ────────────────────────────────────────────────────────
  const handleEditSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.updateTodo(id, data);
      setTodo(response.data.data);
      toast.success('Task updated successfully!');
      setIsEditOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.deleteTodo(id);
      toast.success('Task deleted.');
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Failed to delete task.');
      setIsDeleting(false);
    }
  };

  // ── Loading skeleton ───────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Back button skeleton */}
        <div className="skeleton h-9 w-24 rounded-lg mb-8" />
        <div className="glass-card p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="skeleton h-7 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/4 rounded" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="skeleton h-3 w-32 rounded" />
              <div className="skeleton h-3 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-200 mb-2">Task not found</h2>
        <p className="text-sm text-slate-500 mb-6">{error}</p>
        <div className="flex gap-3">
          <button className="btn-secondary" onClick={() => navigate('/')}>
            <ArrowLeft size={15} />
            Back to Tasks
          </button>
          <button className="btn-primary" onClick={fetchTodo}>
            <RefreshCw size={15} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!todo) return null;

  const priorityConfig = PRIORITY_CONFIG[todo.priority] || PRIORITY_CONFIG.MEDIUM;
  const isOverdue = todo.dueDate && !todo.completed && isAfter(new Date(), new Date(todo.dueDate));

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* ── Back button ───────────────────────────────────────────────────── */}
      <button
        onClick={() => navigate('/')}
        className="btn-secondary mb-8"
        id="back-to-dashboard-btn"
      >
        <ArrowLeft size={15} />
        All Tasks
      </button>

      {/* ── Main card ─────────────────────────────────────────────────────── */}
      <div className="glass-card overflow-hidden">

        {/* Card header gradient accent */}
        <div
          className="h-1 w-full"
          style={{
            background: todo.completed
              ? 'linear-gradient(90deg, #10b981, #059669)'
              : isOverdue
              ? 'linear-gradient(90deg, #ef4444, #dc2626)'
              : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          }}
        />

        <div className="p-8">
          {/* ── Title + status + actions ─────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <div className="flex-1 min-w-0">
              {/* Status badge */}
              <div className="mb-3">
                {todo.completed ? (
                  <span className="badge-completed">
                    <CheckCircle2 size={12} />
                    Completed
                  </span>
                ) : (
                  <span className="badge-active">
                    <Circle size={12} className="fill-current" style={{ fontSize: 6 }} />
                    Active
                  </span>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-xl sm:text-2xl font-bold leading-tight"
                style={
                  todo.completed
                    ? { textDecoration: 'line-through', color: '#475569' }
                    : { color: '#f1f5f9' }
                }
              >
                {todo.title}
              </h1>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleToggle}
                disabled={isToggling}
                className="btn-secondary text-xs px-3 py-2"
                id="toggle-complete-btn"
              >
                {isToggling
                  ? '...'
                  : todo.completed
                  ? 'Mark Active'
                  : 'Mark Done'}
              </button>
              <button
                onClick={() => setIsEditOpen(true)}
                className="btn-icon"
                aria-label="Edit task"
                id="details-edit-btn"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="btn-icon hover:text-red-400 hover:bg-red-500/10"
                aria-label="Delete task"
                id="details-delete-btn"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* ── Description ──────────────────────────────────────────────── */}
          {todo.description && (
            <p
              className="text-sm leading-relaxed mb-8 pb-6"
              style={{
                color: '#94a3b8',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {todo.description}
            </p>
          )}

          {/* ── Detail rows ──────────────────────────────────────────────── */}
          <div>
            {/* Priority */}
            <DetailRow icon={priorityConfig.icon} label="Priority">
              <span className={priorityConfig.className}>{priorityConfig.label}</span>
            </DetailRow>

            {/* Status */}
            <DetailRow icon={todo.completed ? CheckCircle2 : Circle} label="Status">
              {todo.completed ? (
                <span className="badge-completed"><CheckCircle2 size={12} />Completed</span>
              ) : (
                <span className="badge-active"><Circle size={10} />Active</span>
              )}
            </DetailRow>

            {/* Category */}
            {todo.category && (
              <DetailRow icon={Tag} label="Category">
                <span
                  className="px-2 py-0.5 rounded-md text-xs font-medium"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    color: '#a5b4fc',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  {todo.category}
                </span>
              </DetailRow>
            )}

            {/* Due Date */}
            {todo.dueDate && (
              <DetailRow
                icon={isOverdue ? AlertTriangle : Calendar}
                label="Due Date"
                highlight={isOverdue ? '#f87171' : undefined}
              >
                {isOverdue && (
                  <span className="text-red-400 font-medium text-xs mr-2">OVERDUE · </span>
                )}
                {format(new Date(todo.dueDate), 'MMMM d, yyyy')}
              </DetailRow>
            )}

            {/* Completed At */}
            {todo.completedAt && (
              <DetailRow icon={CheckCircle2} label="Completed On" highlight="#34d399">
                {format(new Date(todo.completedAt), 'MMMM d, yyyy · h:mm a')}
              </DetailRow>
            )}

            {/* Created At */}
            <DetailRow icon={Calendar} label="Created">
              {format(new Date(todo.createdAt), 'MMMM d, yyyy · h:mm a')}
            </DetailRow>

            {/* Updated At */}
            <DetailRow icon={Clock} label="Last Updated">
              {format(new Date(todo.updatedAt), 'MMMM d, yyyy · h:mm a')}
            </DetailRow>
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      <TodoForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={todo}
        isSubmitting={isSubmitting}
      />

      {isDeleteOpen && (
        <DeleteModal
          title={todo.title}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteOpen(false)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
