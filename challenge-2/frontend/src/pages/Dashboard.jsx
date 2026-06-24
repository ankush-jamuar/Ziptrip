import { useState } from 'react';
import { Plus, ListTodo, CheckCheck, Clock, Flame, AlertTriangle, RefreshCw } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import StatsCard from '../components/StatsCard';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

// ─── Delete Confirmation Modal ─────────────────────────────────────────────────
function DeleteModal({ todo, onConfirm, onCancel, isDeleting }) {
  if (!todo) return null;
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
        aria-labelledby="delete-title"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(239,68,68,0.1)' }}
        >
          <AlertTriangle size={22} className="text-red-400" />
        </div>
        <h3 id="delete-title" className="text-base font-semibold text-slate-100 mb-2">
          Delete Task?
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          "<span className="text-slate-300 font-medium">{todo.title}</span>" will be permanently
          deleted. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            className="btn-secondary flex-1"
            onClick={onCancel}
            disabled={isDeleting}
            id="delete-cancel-btn"
          >
            Cancel
          </button>
          <button
            className="btn-danger flex-1"
            onClick={onConfirm}
            disabled={isDeleting}
            id="delete-confirm-btn"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Page ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const {
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
    todos,
  } = useTodos();

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAddNew = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    let result;
    if (editingTodo) {
      result = await updateTodo(editingTodo.id, data);
    } else {
      result = await createTodo(data);
    }
    setIsSubmitting(false);
    if (result.success) setIsFormOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTodo) return;
    setIsDeleting(true);
    const result = await deleteTodo(deletingTodo.id);
    setIsDeleting(false);
    if (result.success) setDeletingTodo(null);
  };

  // ── Filter counts (for tab badges) ────────────────────────────────────────
  const filterCounts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  // ── Stats config ──────────────────────────────────────────────────────────
  const statsConfig = [
    {
      icon: ListTodo,
      label: 'Total Tasks',
      value: stats.total,
      color: '#818cf8',
      gradient: 'rgba(99,102,241,0.15)',
    },
    {
      icon: CheckCheck,
      label: 'Completed',
      value: stats.completed,
      color: '#34d399',
      gradient: 'rgba(16,185,129,0.15)',
    },
    {
      icon: Clock,
      label: 'Pending',
      value: stats.pending,
      color: '#fbbf24',
      gradient: 'rgba(245,158,11,0.15)',
    },
    {
      icon: Flame,
      label: 'High Priority',
      value: stats.highPriority,
      color: '#f87171',
      gradient: 'rgba(239,68,68,0.15)',
    },
  ];

  // ── Error state ───────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-200 mb-2">Failed to load tasks</h2>
        <p className="text-sm text-slate-500 mb-6 max-w-sm">{error}</p>
        <button className="btn-primary" onClick={fetchTodos}>
          <RefreshCw size={15} />
          Try Again
        </button>
      </div>
    );
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return <LoadingSkeleton count={6} />;
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-8 animate-fade-in">

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">My Tasks</h1>
          <p className="text-sm text-slate-500 mt-1">
            {stats.pending > 0
              ? `${stats.pending} task${stats.pending !== 1 ? 's' : ''} pending`
              : 'All tasks completed 🎉'}
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="btn-primary self-start sm:self-auto"
          id="add-todo-btn"
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {statsConfig.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* ── Search + Filter toolbar ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterTabs
          activeFilter={activeFilter}
          onChange={setActiveFilter}
          counts={filterCounts}
        />
      </div>

      {/* ── Todo grid / Empty state ────────────────────────────────────────── */}
      {filteredTodos.length === 0 ? (
        <EmptyState
          filter={activeFilter}
          searchQuery={searchQuery}
          onAddNew={handleAddNew}
        />
      ) : (
        <>
          {/* Results count */}
          <p className="text-xs text-slate-600 -mb-4">
            {filteredTodos.length} task{filteredTodos.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEdit={handleEdit}
                onDelete={setDeletingTodo}
                onToggle={toggleComplete}
              />
            ))}
          </div>
        </>
      )}

      {/* ── Modals ────────────────────────────────────────────────────────── */}
      <TodoForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTodo}
        isSubmitting={isSubmitting}
      />

      <DeleteModal
        todo={deletingTodo}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingTodo(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
