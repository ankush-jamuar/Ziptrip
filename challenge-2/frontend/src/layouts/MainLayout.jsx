import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * MainLayout — shared wrapper for all pages.
 * Renders the Navbar and a main content area with consistent padding.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
