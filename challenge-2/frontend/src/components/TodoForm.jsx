import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

const PRIORITIES = [
  { value: 'LOW', label: 'Low', color: '#94a3b8' },
  { value: 'MEDIUM', label: 'Medium', color: '#fbbf24' },
  { value: 'HIGH', label: 'High', color: '#f87171' },
];

const CATEGORIES = ['Development', 'Design', 'DevOps', 'Review', 'Documentation', 'Security', 'Other'];

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  category: '',
  dueDate: '',
};

/**
 * TodoForm — modal for creating and editing todos.
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose(): callback
 *  - onSubmit(formData): callback
 *  - initialData?: Partial<Todo> (for edit mode)
 *  - isSubmitting: boolean
 */
export default function TodoForm({ isOpen, onClose, onSubmit, initialData, isSubmitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);
  const isEdit = !!initialData;

  // Populate form for edit mode
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          title: initialData.title || '',
          description: initialData.description || '',
          priority: initialData.priority || 'MEDIUM',
          category: initialData.category || '',
          dueDate: initialData.dueDate
            ? new Date(initialData.dueDate).toISOString().split('T')[0]
            : '',
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setErrors({});
      // Focus title field after open animation
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isOpen, initialData]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    else if (form.title.trim().length > 255) errs.title = 'Title is too long (max 255 chars).';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      priority: form.priority,
      category: form.category || null,
      dueDate: form.dueDate || null,
    };

    await onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: isEdit ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)' }}
            >
              <CheckCircle size={16} style={{ color: isEdit ? '#818cf8' : '#10b981' }} />
            </div>
            <h2 id="modal-title" className="text-base font-semibold text-slate-100">
              {isEdit ? 'Edit Task' : 'New Task'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Form Body ────────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 flex flex-col gap-4">

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-xs font-medium text-slate-400 mb-1.5">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                ref={titleRef}
                id="title"
                name="title"
                type="text"
                className="input-field"
                placeholder="What needs to be done?"
                value={form.title}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-xs text-red-400 mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-medium text-slate-400 mb-1.5">
                Description <span className="text-slate-600">optional</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="input-field resize-none"
                placeholder="Add more context..."
                value={form.description}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Priority + Category row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="priority" className="block text-xs font-medium text-slate-400 mb-1.5">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="input-field"
                  value={form.priority}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  {PRIORITIES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-xs font-medium text-slate-400 mb-1.5">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="input-field"
                  value={form.category}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">No category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-xs font-medium text-slate-400 mb-1.5">
                Due Date <span className="text-slate-600">optional</span>
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                className="input-field"
                value={form.dueDate}
                onChange={handleChange}
                disabled={isSubmitting}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* ── Footer ─────────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-end gap-3 px-6 py-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              id={isEdit ? 'edit-todo-submit' : 'create-todo-submit'}
            >
              {isSubmitting
                ? (isEdit ? 'Saving...' : 'Creating...')
                : (isEdit ? 'Save Changes' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
