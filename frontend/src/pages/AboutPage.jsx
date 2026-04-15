import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck, Globe, Zap, Cpu, BarChart3, Users, Rocket, Network, ChevronRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-dark pt-48 pb-32 px-6 relative overflow-hidden">
      {/* 1. TACTICAL BACKGROUND SYSTEM */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="cyber-grid opacity-20" />
        <div className="mesh-blob top-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan/10 animate-pulse-slow" />
        <div className="mesh-blob bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-magenta/10" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 2. HERO SECTION - HIGH CONTRAST REFACTOR */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-cyan/30 text-cyan text-[10px] font-black tracking-[0.4em] uppercase mb-12 shadow-[0_0_20px_rgba(0,242,255,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            Our Vision & Strategic Impact
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[140px] font-black mb-12 leading-[0.8] tracking-tighter text-white uppercase italic"
          >
            FUTURE OF <br />
            <span className="text-gradient-cyan not-italic">RESILIENT</span> <br />
            LOGISTICS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            In an era of global volatility, supply chains can no longer afford to be reactive.
            LogiMind AI was built to turn <span className="text-white font-bold underline decoration-cyan/30 underline-offset-8">uncertainty into a competitive advantage.</span>
          </motion.p>
        </div>

        {/* 3. BENTO GRID V2 - GLASSMORPHISM & TACTICAL DATA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">

          {/* Core Mission Panel (Large) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bento-item bento-item-large border-l-4 border-l-cyan group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[8px] text-cyan tracking-widest hidden md:block">
              MISSION_LOG_V3.8
            </div>
            <h2 className="text-5xl font-black mb-10 flex items-center gap-6 text-white uppercase tracking-tighter italic">
              <div className="w-16 h-16 glass-card flex items-center justify-center text-cyan neon-glow-cyan border-cyan/20">
                <Target size={32} />
              </div>
              The Mission
            </h2>
            <div className="space-y-8 text-slate-400 text-xl font-medium leading-relaxed">
              <p>
                LogiMind AI was born from a single observation: <span className="text-white font-bold">Traditional systems are brittle.</span> When disruptions occur, reaction time is the difference between profit and catastrophic failure.
              </p>
              <p>
                We believe in <span className="text-cyan font-bold text-glow">Dynamic Resilience.</span> By leveraging sub-millisecond Dijkstra pathfinding and real-time AI modeling, we empower fleets to pivot instantly.
              </p>
            </div>
            <div className="mt-12 flex gap-6">
               <div className="px-4 py-2 glass-card border-white/5 text-[9px] font-black text-slate-500 tracking-widest uppercase">Autonomous_Recovery</div>
               <div className="px-4 py-2 glass-card border-white/5 text-[9px] font-black text-slate-500 tracking-widest uppercase">Sub-Ms_Latency</div>
            </div>
          </motion.div>

          {/* Telemetry Visual Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden relative group p-10 flex flex-col items-center justify-center min-h-[450px] border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="scanline-laser opacity-20" />
            <div className="absolute inset-0 grid-overlay opacity-10 group-hover:opacity-20 transition-opacity" />

            <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-56 h-56 rounded-full border-2 border-dashed border-cyan/20 flex items-center justify-center relative animate-spin-slow">
                   <Globe size={140} className="text-cyan opacity-5 absolute" />
                   <div className="absolute inset-0 border-2 border-magenta/20 rounded-full scale-75 animate-pulse" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                   <Network size={70} className="text-cyan neon-glow-cyan animate-pulse" />
                </div>

                <div className="mt-16 grid grid-cols-2 gap-12 w-full pt-10 border-t border-white/5">
                  <div className="text-center group-hover:scale-110 transition-transform">
                    <p className="text-4xl font-black text-white font-mono tracking-tighter">94%</p>
                    <p className="text-[9px] font-black text-cyan uppercase tracking-widest mt-2">Precision</p>
                  </div>
                  <div className="text-center group-hover:scale-110 transition-transform">
                    <p className="text-4xl font-black text-magenta font-mono tracking-tighter">0.4s</p>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">Latency</p>
                  </div>
                </div>
            </div>
          </motion.div>

          {/* Strategic Metrics */}
          {[
            { label: "Efficiency Gain", val: "+24%", color: "text-cyan", icon: Zap, border: "border-cyan/20", glow: "shadow-cyan/10" },
            { label: "Cost Reduction", val: "-30%", color: "text-magenta", icon: Cpu, border: "border-magenta/20", glow: "shadow-magenta/10" },
            { label: "Risk Mitigation", val: "99.9%", color: "text-acid", icon: ShieldCheck, border: "border-acid/20", glow: "shadow-acid/10" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className={`glass-card p-12 text-center border-b-2 ${stat.border} transition-all shadow-xl ${stat.glow}`}
            >
              <div className={`w-16 h-16 mx-auto mb-8 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/5 group-hover:rotate-12 transition-transform`}>
                <stat.icon size={32} />
              </div>
              <h4 className={`text-6xl font-black mb-3 ${stat.color} font-mono tracking-tighter`}>{stat.val}</h4>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* 4. TACTICAL HUD SECTION - PHILOSOPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 py-20 border-y border-white/5 relative">
           <div className="absolute top-0 left-0 w-32 h-1 bg-cyan shadow-[0_0_15px_#00f2ff]" />

           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              <p className="text-cyan font-mono text-xs tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-cyan/30" />
                Strategic Nucleus
              </p>
              <h2 className="text-6xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.9] italic">
                THE NERVOUS SYSTEM <br />FOR <span className="text-gradient-cyan not-italic">GLOBAL TRADE.</span>
              </h2>
              <div className="space-y-8">
                 {[
                   { icon: Users, title: "Elite Pathfinding", desc: "Our neural architects specialize in multi-agent pathfinding and graph theory." },
                   { icon: BarChart3, title: "Predictive Analytics", desc: "Back-testing against 50 years of global disruption data to find the Golden Path." },
                   { icon: Globe, title: "Transcontinental Sync", desc: "Real-time synchronization across land, sea, and air logistical nodes." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-8 p-6 glass-card border-transparent hover:border-white/10 group transition-all">
                      <div className="w-14 h-14 glass-card flex items-center justify-center text-cyan group-hover:scale-110 transition-transform border-cyan/10">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-white text-lg font-black mb-1 uppercase tracking-tight flex items-center gap-3">
                          {item.title}
                          <ChevronRight size={14} className="text-cyan opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative glass-card aspect-square overflow-hidden border-white/5 flex items-center justify-center shadow-2xl bg-slate-950/50"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10 opacity-40 animate-pulse" />
              <div className="absolute inset-0 grid-overlay opacity-20" />
              <div className="relative z-10 text-center p-16">
                 <div className="w-28 h-28 bg-cyan/10 rounded-full border border-cyan/20 flex items-center justify-center text-cyan mx-auto mb-10 neon-glow-cyan animate-pulse">
                    <Rocket size={48} />
                 </div>
                 <p className="text-3xl font-black text-white italic leading-[1.1] mb-10 tracking-tight">
                    "WE DON'T JUST OPTIMIZE ROUTES; WE SECURE THE GLOBAL FLOW."
                 </p>
                 <div className="h-[2px] w-16 bg-gradient-to-r from-cyan to-transparent mx-auto mb-8" />
                 <p className="text-sm font-black text-white uppercase tracking-[0.4em]">LogiMind Engineering</p>
                 <p className="text-[10px] text-cyan/50 font-mono uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                    <span className="w-1 h-1 bg-cyan rounded-full animate-ping" />
                    Authorized Protocol v4.0
                 </p>
              </div>
           </motion.div>
        </div>

        {/* 5. CALL TO ACTION - FINAL DEPLOYMENT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-32 glass-card border-cyan/30 relative overflow-hidden group shadow-[0_0_100px_rgba(0,242,255,0.05)]"
        >
           <div className="absolute inset-0 scanline-laser opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <h2 className="text-6xl md:text-8xl font-black text-white mb-12 uppercase tracking-tighter leading-none">
              READY FOR THE <br /> <span className="text-gradient-cyan">NEXT EVOLUTION?</span>
           </h2>
           <Link to="/dashboard" className="btn-neon px-24 py-10 text-lg font-black tracking-[0.6em] group relative overflow-hidden">
              <span className="relative z-10">Initiate System</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-25deg]" />
           </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
