import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Check, Circle, Calendar, Tag, AlertCircle } from 'lucide-react';
import { format, isAfter } from 'date-fns';

// ─── Helpers ───────────────────────────────────────────────────────────────────

const PRIORITY_CONFIG = {
  HIGH: { className: 'badge-high', label: 'High' },
  MEDIUM: { className: 'badge-medium', label: 'Medium' },
  LOW: { className: 'badge-low', label: 'Low' },
};

function PriorityBadge({ priority }) {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.MEDIUM;
  return <span className={config.className}>{config.label}</span>;
}

/**
 * TodoCard — displays a single todo with all actions.
 *
 * Props:
 *  - todo: Todo object
 *  - onEdit(todo): opens the edit modal
 *  - onDelete(todo): opens the delete confirmation modal
 *  - onToggle(todo): toggles completion status
 */
export default function TodoCard({ todo, onEdit, onDelete, onToggle }) {
  const navigate = useNavigate();
  const isOverdue =
    todo.dueDate && !todo.completed && isAfter(new Date(), new Date(todo.dueDate));

  return (
    <article
      className="glass-card p-5 flex flex-col gap-4 group relative overflow-hidden animate-fade-in"
      style={
        todo.completed
          ? { opacity: 0.65 }
          : isOverdue
          ? { borderColor: 'rgba(239,68,68,0.25)' }
          : {}
      }
    >
      {/* Completion stripe accent */}
      {todo.completed && (
        <div
          className="absolute top-0 left-0 bottom-0 w-0.5 rounded-l-xl"
          style={{ background: 'linear-gradient(180deg, #10b981, #059669)' }}
        />
      )}

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        {/* Toggle complete button */}
        <button
          onClick={() => onToggle(todo)}
          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          style={
            todo.completed
              ? { background: '#10b981', borderColor: '#10b981' }
              : { borderColor: '#334155' }
          }
          aria-label={todo.completed ? 'Mark as active' : 'Mark as complete'}
          title={todo.completed ? 'Mark as active' : 'Mark as complete'}
        >
          {todo.completed && <Check size={11} className="text-white" strokeWidth={3} />}
        </button>

        {/* Title */}
        <h3
          className="flex-1 font-semibold text-sm leading-snug cursor-pointer hover:text-emerald-400 transition-colors"
          style={todo.completed ? { textDecoration: 'line-through', color: '#64748b' } : { color: '#f1f5f9' }}
          onClick={() => navigate(`/todo/${todo.id}`)}
          title="View details"
        >
          {todo.title}
        </h3>

        {/* Priority badge */}
        <PriorityBadge priority={todo.priority} />
      </div>

      {/* ── Description ─────────────────────────────────────────────────── */}
      {todo.description && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 ml-8">
          {todo.description}
        </p>
      )}

      {/* ── Meta row ────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 ml-8">
        {/* Category */}
        {todo.category && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Tag size={11} />
            {todo.category}
          </span>
        )}

        {/* Due date */}
        {todo.dueDate && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: isOverdue ? '#f87171' : '#64748b' }}
          >
            {isOverdue ? <AlertCircle size={11} /> : <Calendar size={11} />}
            {isOverdue ? 'Overdue · ' : ''}
            {format(new Date(todo.dueDate), 'MMM d, yyyy')}
          </span>
        )}

        {/* Created date — always shown */}
        {!todo.dueDate && (
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Circle size={9} className="fill-current" />
            {format(new Date(todo.createdAt), 'MMM d')}
          </span>
        )}
      </div>

      {/* ── Action buttons ───────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-end gap-1 pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* View */}
        <button
          onClick={() => navigate(`/todo/${todo.id}`)}
          className="btn-icon"
          aria-label="View todo"
          title="View details"
        >
          <Eye size={15} />
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(todo)}
          className="btn-icon"
          aria-label="Edit todo"
          title="Edit"
        >
          <Pencil size={15} />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(todo)}
          className="btn-icon hover:text-red-400 hover:bg-red-500/10"
          aria-label="Delete todo"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}
