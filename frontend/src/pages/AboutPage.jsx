import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck, Globe, Zap, Cpu, BarChart3, Users, Rocket, Network, ChevronRight, Github, Mail, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { voiceAssistant } from '../utils/voiceProtocol';

const AboutPage = () => {
  const [isBriefing, setIsBriefing] = useState(false);

  const startBriefing = () => {
    setIsBriefing(true);
    voiceAssistant.speak(
      "LogiMind AI is a tactical response to global supply chain fragility. Developed by Krishna Patil Rajput and Vanshita Sawale for the 2026 Google Solution Challenge, our mission is to build resilient, AI-driven logistics infrastructure. We utilize Gemini and Vertex AI to predict disruptions and execute dynamic pathfinding, aligning with UN Sustainable Development Goals 9 and 12.",
      "high"
    );
  };

  const stopBriefing = () => {
    setIsBriefing(false);
    voiceAssistant.stop();
  };

  return (
    <div className="min-h-screen bg-dark pt-48 pb-32 px-6 relative overflow-hidden">
      {/* 1. TACTICAL BACKGROUND SYSTEM */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="cyber-grid opacity-20" />
        <Network size={800} className="absolute -top-20 -right-20 text-cyan/5 rotate-12" />
        <div className="mesh-blob top-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan/10 animate-pulse-slow" />
        <div className="mesh-blob bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-magenta/10" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 2. HERO SECTION - MISSION STATEMENT */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-cyan/30 text-cyan text-[10px] font-black tracking-[0.4em] uppercase mb-12 shadow-[0_0_20px_rgba(0,242,255,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            Google Solution Challenge 2026 // Hack2Skills
          </motion.div>

          <div className="absolute top-0 right-0 md:right-10">
            <button
              onClick={isBriefing ? stopBriefing : startBriefing}
              className={`p-4 rounded-full glass-card border-white/10 hover:border-cyan/50 transition-all group ${isBriefing ? 'bg-cyan/10 animate-pulse' : ''}`}
              title={isBriefing ? "Stop Briefing" : "Listen to Mission Briefing"}
            >
              {isBriefing ? <VolumeX className="text-magenta" size={24} /> : <Volume2 className="text-cyan group-hover:scale-110 transition-transform" size={24} />}
            </button>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[140px] font-black mb-12 leading-[0.8] tracking-tighter text-white uppercase italic"
          >
            OUR <br />
            <span className="text-gradient-cyan not-italic">MISSION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed"
          >
            LogiMind AI was born from a simple realization: <span className="text-white font-bold">global supply chains are fragile.</span> In an era of unpredictable weather and complex transit networks, static routing is no longer enough.
          </motion.p>
        </div>

        {/* 3. CORE PHILOSOPHY - WHAT WE SOLVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 border-l-4 border-l-cyan bg-cyan/5"
          >
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 italic">What We Solve</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Traditional systems identify bottlenecks after they happen. LogiMind AI uses predictive telemetry to detect disruptions before they cascade.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Whether it’s a sudden storm cell or a localized gridlock, our engine executes dynamic route adjustments in real-time to keep the world moving.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 border-l-4 border-l-magenta bg-magenta/5"
          >
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 italic">UN SDG Alignment</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center shrink-0 font-black text-xl">9</div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-tight">Industry & Infrastructure</h4>
                  <p className="text-sm text-slate-500">Building resilient logistics frameworks that withstand global volatility.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center shrink-0 font-black text-xl">12</div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-tight">Responsible Production</h4>
                  <p className="text-sm text-slate-500">Eliminating fuel waste and transit loss through neural pathfinding.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4. TECH STACK - TECHNICAL MERIT */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <p className="text-acid font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Neural Architecture</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">The Tech <span className="text-gradient-acid italic">Stack</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Decision Engine",
                desc: "Built using Google Vertex AI to process multifaceted transit data and identify anomalies.",
                icon: Cpu,
                color: "text-cyan"
              },
              {
                title: "Neural Telemetry",
                desc: "Real-time data streams analyzed with Gemini to provide natural language operational insights.",
                icon: Network,
                color: "text-acid"
              },
              {
                title: "Resilient Infrastructure",
                desc: "A high-performance dashboard designed for sub-15ms latency, ensuring mission-critical decisions.",
                icon: Zap,
                color: "text-magenta"
              }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-10 border-white/5 bg-slate-900/40 relative overflow-hidden group"
              >
                <div className={`w-14 h-14 glass-card flex items-center justify-center ${tech.color} mb-8 border-white/10 group-hover:scale-110 transition-transform`}>
                  <tech.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{tech.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{tech.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <tech.icon size={100} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. TEAM RECOGNITION - HACK2SKILLS */}
        <div className="mb-32 py-24 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-1 bg-cyan shadow-[0_0_15px_#00f2ff]" />
          <div className="absolute bottom-0 right-0 w-32 h-1 bg-magenta shadow-[0_0_15px_#ff00ff]" />

          <div className="text-center mb-20">
            <p className="text-cyan font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Command Personnel</p>
            <h2 className="text-6xl font-black text-white uppercase tracking-tighter italic">The <span className="text-gradient-cyan not-italic">Team</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
             {/* Lead Developer */}
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="glass-card p-12 text-center relative group"
             >
                <div className="w-32 h-32 mx-auto rounded-full bg-cyan/10 border-2 border-cyan/30 p-1 mb-8 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-cyan overflow-hidden">
                    <img
                      src="/boy.png"
                      alt="Krishna Patil Rajput"
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = 'https://krishna-patil-rajput.vercel.app/_next/image?url=%2Fkrishnapic.jpg&w=1920&q=75'}
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Krishna Patil Rajput</h3>
                <p className="text-cyan font-mono text-xs uppercase tracking-[0.3em] mb-6">Lead Developer // AI Architect</p>
                <div className="flex justify-center gap-6">
                  <a href="https://github.com/Krishna67890" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <Github size={20} className="text-slate-600 group-hover:text-white" />
                  </a>
                  <a href="https://krishna-patil-rajput.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">
                    <ExternalLink size={20} className="text-slate-600 group-hover:text-cyan" />
                  </a>
                  <a href="mailto:krishnapatilrajput.dev@gmail.com">
                    <Mail size={20} className="text-slate-600 hover:text-white transition-colors" />
                  </a>
                </div>
                <div className="absolute inset-0 border border-cyan/0 group-hover:border-cyan/20 transition-all rounded-xl pointer-events-none" />
             </motion.div>

             {/* UI/Dashboard Creator */}
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="glass-card p-12 text-center relative group"
             >
                <div className="w-32 h-32 mx-auto rounded-full bg-magenta/10 border-2 border-magenta/30 p-1 mb-8 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-magenta overflow-hidden">
                    <img
                      src="/girl.png"
                      alt="Vanshita Sawale"
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Vanshita+Sawale&background=ff00ff&color=fff&size=256'}
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Vanshita Sawale</h3>
                <p className="text-magenta font-mono text-xs uppercase tracking-[0.3em] mb-6">Dashboard Creator // UI Engineer</p>
                <div className="flex justify-center gap-6">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <BarChart3 size={20} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Globe size={20} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                  </a>
                </div>
                <div className="absolute inset-0 border border-magenta/0 group-hover:border-magenta/20 transition-all rounded-xl pointer-events-none" />
             </motion.div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-600 font-mono text-[10px] uppercase tracking-widest italic">
              Developed for the Solution Challenge 2026 // Organized by Hack2Skills
            </p>
          </div>
        </div>

        {/* 6. CALL TO ACTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-32 glass-card border-cyan/30 relative overflow-hidden group"
        >
           <div className="absolute inset-0 scanline-laser opacity-20" />
           <h2 className="text-5xl md:text-7xl font-black text-white mb-12 uppercase tracking-tighter leading-none">
              READY TO <span className="text-gradient-cyan">DECODE THE CHAOS?</span>
           </h2>
           <Link to="/dashboard" className="btn-neon px-24 py-10 text-lg font-black tracking-[0.6em] group relative overflow-hidden">
              <span className="relative z-10">Access Dashboard</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-25deg]" />
           </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
