/**
 * StatsCard — displays a single statistic with an icon, value, label, and accent color.
 * Used in the Dashboard header row.
 */
export default function StatsCard({ icon: Icon, label, value, color, gradient }) {
  return (
    <div
      className="glass-card p-5 flex items-center gap-4 cursor-default select-none"
      style={{ '--hover-border': color }}
    >
      {/* Icon container */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: gradient }}
      >
        <Icon size={20} style={{ color }} />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight" style={{ color }}>
          {value}
        </p>
        <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">{label}</p>
      </div>
    </div>
  );
}
