import { Search, X } from 'lucide-react';

/**
 * SearchBar — controlled search input with clear button.
 * Parent handles debounce or immediate state updates via onChange.
 */
export default function SearchBar({ value, onChange, placeholder = 'Search tasks...' }) {
  return (
    <div className="relative flex-1 min-w-0">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={16} className="text-slate-500" />
      </div>

      <input
        id="search-todos"
        type="text"
        className="input-field pl-9 pr-9"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />

      {/* Clear button — only shows when there's a value */}
      {value && (
        <button
          className="absolute inset-y-0 right-2 flex items-center px-1 text-slate-500 hover:text-slate-300 transition-colors"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
