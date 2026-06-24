import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import TodoDetails from './pages/TodoDetails';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* Splash renders on top (z-9999) while the app loads behind it */}
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      <BrowserRouter>
        {/* Global toast notifications — styled to match dark theme */}
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f1729',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'Inter, system-ui, sans-serif',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#f1f5f9',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#f1f5f9',
              },
            },
            loading: {
              iconTheme: {
                primary: '#6366f1',
                secondary: '#f1f5f9',
              },
            },
          }}
        />

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/todo/:id" element={<TodoDetails />} />
          </Route>
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
