import { Plus, ClipboardList, Search, CheckCircle } from 'lucide-react';

/**
 * EmptyState — shown when there are no todos matching the current filter/search.
 *
 * Props:
 *  - filter: 'all' | 'active' | 'completed'
 *  - searchQuery: string
 *  - onAddNew(): callback to open the add todo modal
 */
export default function EmptyState({ filter, searchQuery, onAddNew }) {
  const isSearching = !!searchQuery.trim();

  const config = isSearching
    ? {
        Icon: Search,
        iconColor: '#818cf8',
        title: 'No results found',
        description: `No tasks match "${searchQuery}". Try a different keyword or clear the search.`,
        showCTA: false,
      }
    : filter === 'completed'
    ? {
        Icon: CheckCircle,
        iconColor: '#34d399',
        title: 'No completed tasks yet',
        description: 'Tasks you finish will appear here. Complete your first task to get started.',
        showCTA: false,
      }
    : filter === 'active'
    ? {
        Icon: ClipboardList,
        iconColor: '#fbbf24',
        title: "You're all caught up!",
        description: 'No active tasks right now. Add something new to keep the momentum going.',
        showCTA: true,
      }
    : {
        Icon: ClipboardList,
        iconColor: '#818cf8',
        title: 'No tasks yet',
        description: 'Create your first task and start organizing your workflow.',
        showCTA: true,
      };

  const { Icon, iconColor, title, description, showCTA } = config;

  return (
    <div className="empty-state-card">
      {/* Icon with pulse ring */}
      <div className="empty-state-icon-ring">
        <Icon size={36} style={{ color: iconColor }} strokeWidth={1.5} />
      </div>

      {/* Text */}
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: '#e2e8f0', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-8"
        style={{ color: '#64748b', maxWidth: '300px' }}
      >
        {description}
      </p>

      {/* CTA */}
      {showCTA && (
        <button
          onClick={onAddNew}
          className="btn-primary"
          id="empty-state-add-btn"
        >
          <Plus size={16} />
          Create Todo
        </button>
      )}
    </div>
  );
}
