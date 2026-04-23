import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, User, Terminal, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import NetworkBackground from '../components/NetworkBackground';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    designation: ''
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('PROTOCOL ERROR: PASSWORD_INSUFFICIENT_LENGTH');
      return;
    }

    setLoading(true);
    // Simulated Booting Sequence
    setTimeout(() => {
      setLoading(false);
      const mockToken = `LOGIMIND_TOKEN_${Date.now()}`;
      localStorage.setItem('logimind_auth_token', mockToken);
      localStorage.setItem('logimind_auth_timestamp', Date.now().toString());
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark relative overflow-hidden flex items-center justify-center px-4">
      <div className="fixed inset-0 z-0">
        <NetworkBackground />
        <div className="cyber-grid opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8 border-cyan/20 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          {/* Decorative Corner HUD */}
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <Terminal size={40} className="text-cyan" />
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-cyan/10 border border-cyan/30 mb-4 neon-glow-cyan">
              <Shield className="text-cyan" size={32} />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
              {isLogin ? 'Establish Connection' : 'Register Operator'}
            </h1>
            <p className="text-[10px] font-mono text-cyan uppercase tracking-widest mt-2">
              Secure Terminal Access // Node_Alpha
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <AnimatePresence mode='wait'>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Command Designation</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan transition-colors" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="OPERATOR_NAME"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-all"
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Credential Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan transition-colors" size={18} />
                <input
                  type="email"
                  required
                  placeholder="comm_link@secure.net"
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan transition-colors" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 transition-all"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-magenta/10 border border-magenta/30 text-magenta text-[10px] font-mono uppercase font-bold"
              >
                <AlertTriangle size={14} />
                {error}
              </motion.div>
            )}

            <button
              disabled={loading}
              className="w-full bg-cyan hover:bg-cyan-light text-black font-black uppercase tracking-[0.2em] py-4 rounded-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden group shadow-[0_0_20px_rgba(0,242,255,0.2)]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>System Booting...</span>
                </>
              ) : (
                <>
                  <span>Authorize Access</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-mono text-slate-500 hover:text-cyan uppercase tracking-widest transition-colors"
            >
              {isLogin ? "Need Operator Registration?" : "Already Authorized? Access Terminal"}
            </button>

            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">Identity Providers</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-3 transition-all">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3 h-3 grayscale group-hover:grayscale-0" />
              Continue with Google Authority
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
