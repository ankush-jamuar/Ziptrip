const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

/**
 * FilterTabs — pill-style tabs for filtering todos by completion status.
 */
export default function FilterTabs({ activeFilter, onChange, counts }) {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      role="tablist"
      aria-label="Filter todos"
    >
      {FILTERS.map(({ value, label }) => {
        const isActive = activeFilter === value;
        const count = counts?.[value];

        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            style={
              isActive
                ? {
                    background: 'rgba(99,102,241,0.2)',
                    color: '#a5b4fc',
                    border: '1px solid rgba(99,102,241,0.25)',
                  }
                : {
                    color: '#64748b',
                    background: 'transparent',
                    border: '1px solid transparent',
                  }
            }
          >
            {label}
            {count !== undefined && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-semibold leading-none"
                style={
                  isActive
                    ? { background: 'rgba(99,102,241,0.3)', color: '#c7d2fe' }
                    : { background: 'rgba(255,255,255,0.06)', color: '#475569' }
                }
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
