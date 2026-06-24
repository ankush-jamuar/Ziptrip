import { useEffect, useState } from 'react';
import { CheckSquare } from 'lucide-react';

/**
 * SplashScreen — branded loading screen shown once on app startup.
 *
 * Lifecycle:
 *  1. Mounts → visible immediately (fade-in)
 *  2. After `displayDuration` ms → begins fade-out
 *  3. After fade-out completes → calls onDone() to unmount
 *
 * Props:
 *  - onDone(): called when the splash is finished and the app should render
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('in'); // 'in' | 'out'

  useEffect(() => {
    // Stay visible for 900ms, then start fade-out
    const displayTimer = setTimeout(() => setPhase('out'), 900);
    return () => clearTimeout(displayTimer);
  }, []);

  // When fade-out animation ends, signal the parent to unmount this component
  const handleAnimationEnd = () => {
    if (phase === 'out') onDone();
  };

  return (
    <div
      className="splash-root"
      style={{ animationName: phase === 'in' ? 'splashFadeIn' : 'splashFadeOut' }}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Ambient glow orbs — purely decorative */}
      <div className="splash-orb splash-orb--emerald" />
      <div className="splash-orb splash-orb--indigo" />

      {/* Card */}
      <div className="splash-card">
        {/* Logo mark */}
        <div className="splash-logo">
          <CheckSquare size={28} color="#fff" strokeWidth={2} />
        </div>

        {/* App name */}
        <h1 className="splash-title">
          Task<span className="splash-title--accent">Flow</span>
        </h1>

        {/* Subtitle */}
        <p className="splash-subtitle">Modern Todo Management System</p>

        {/* Loading dots */}
        <div className="splash-dots" aria-label="Loading">
          <span className="splash-dot" style={{ animationDelay: '0ms' }} />
          <span className="splash-dot" style={{ animationDelay: '160ms' }} />
          <span className="splash-dot" style={{ animationDelay: '320ms' }} />
        </div>
      </div>
    </div>
  );
}
