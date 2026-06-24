/**
 * LoadingSkeleton — shimmer placeholder grid shown while todos are loading.
 * Renders n skeleton cards matching the todo grid layout.
 */
function SkeletonCard() {
  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="skeleton w-5 h-5 rounded-full flex-shrink-0 mt-0.5" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="skeleton h-4 w-4/5 rounded" />
          <div className="skeleton h-4 w-2/5 rounded" />
        </div>
        <div className="skeleton h-5 w-16 rounded-full flex-shrink-0" />
      </div>

      {/* Description lines */}
      <div className="flex flex-col gap-2 ml-8">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 ml-8">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>

      {/* Action buttons */}
      <div
        className="flex justify-end gap-2 pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="skeleton w-7 h-7 rounded-lg" />
        <div className="skeleton w-7 h-7 rounded-lg" />
        <div className="skeleton w-7 h-7 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * StatsCardSkeleton — placeholder for the stats row.
 */
function StatsCardSkeleton() {
  return (
    <div className="glass-card p-5 flex items-center gap-4">
      <div className="skeleton w-11 h-11 rounded-xl flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="skeleton h-6 w-10 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
