import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Zap } from 'lucide-react';

/**
 * Navbar — top navigation bar with logo and branding.
 * Kept intentionally minimal — the task UI takes center stage.
 */
export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: 'rgba(8, 13, 26, 0.8)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="TaskFlow home"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #10b981, #6366f1)',
                boxShadow: '0 0 16px rgba(16,185,129,0.3)',
              }}
            >
              <CheckSquare size={16} className="text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Task
              <span
                style={{
                  background: 'linear-gradient(90deg, #10b981, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Flow
              </span>
            </span>
          </Link>

          {/* Right side pill */}
          <div
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
              color: '#34d399',
            }}
          >
            <Zap size={11} />
            <span>v1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
