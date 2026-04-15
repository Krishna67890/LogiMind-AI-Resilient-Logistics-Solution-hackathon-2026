import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Info, LayoutDashboard, Rocket, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Infrastructure', path: '/features', icon: Network },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[92%] max-w-5xl z-[100] px-4 md:px-8 py-3 md:py-4 glass-card flex items-center justify-between rounded-full border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-cyan rounded-xl flex items-center justify-center font-black text-black text-sm md:text-base neon-glow-cyan transition-transform group-hover:scale-110">L</div>
          <span className="text-lg md:text-xl font-black uppercase tracking-tighter text-white">LogiMind <span className="text-cyan">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                location.pathname === item.path ? 'text-cyan' : 'text-slate-400 hover:text-white'
              }`}
            >
              <item.icon size={14} />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="hidden sm:flex btn-neon px-6 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-black tracking-[0.2em] rounded-full">
            <Rocket size={14} className="mr-2" />
            Live System
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-cyan transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:hidden"
          >
            <div className="flex flex-col gap-8 w-full">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 text-2xl font-black uppercase tracking-widest ${
                    location.pathname === item.path ? 'text-cyan' : 'text-white'
                  }`}
                >
                  <item.icon size={24} />
                  {item.name}
                </Link>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="btn-neon w-full py-6 text-sm font-black text-center"
              >
                Initiate System
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
