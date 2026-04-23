import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import AuthPage from './pages/AuthPage';
import { animatePage } from './animations/animations';

// PROTECTED ROUTE COMPONENT
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('logimind_auth_token');
  const timestamp = localStorage.getItem('logimind_auth_timestamp');
  const sessionTimeout = 30 * 60 * 1000; // 30 Minutes

  const isAuthenticated = token && timestamp && (Date.now() - parseInt(timestamp) < sessionTimeout);

  if (!isAuthenticated) {
    // Purge invalid session data
    localStorage.removeItem('logimind_auth_token');
    localStorage.removeItem('logimind_auth_timestamp');
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function App() {
  useEffect(() => {
    // Global reveal trigger - added slight delay for DOM stability
    const timer = setTimeout(() => {
      animatePage();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen relative bg-dark flex flex-col">
        {/* Background Mesh Blobs */}
        <div className="mesh-blob top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan/5" />
        <div className="mesh-blob bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-magenta/5" />

        <Navbar />
        <main className="relative z-10 flex-1 h-0">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected Routes - Only accessible after successful Neural Handshake */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
