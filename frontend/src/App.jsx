import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import { animatePage } from './animations/animations';

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
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
