import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Navigation,
  Activity,
  ShieldAlert,
  Cpu,
  Network,
  BarChart3,
  Radio,
  Database,
  CloudLightning,
  Zap,
  Lock,
  Globe
} from 'lucide-react';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-dark pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="mesh-blob top-0 left-0 w-[500px] h-[500px] bg-cyan/5" />
      <div className="mesh-blob bottom-0 right-0 w-[500px] h-[500px] bg-magenta/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-cyan/20 text-cyan text-[10px] font-black tracking-[0.3em] uppercase mb-6"
          >
            <Radio size={12} className="animate-pulse" />
            Infrastructure Specification v4.2
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tighter text-white"
          >
            ENGINEERED FOR <br /><span className="text-cyan">RESILIENCE.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed"
          >
            The LogiMind AI stack combines predictive modeling with real-time optimization to create a supply chain that never sleeps.
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">

          {/* Item 1: Large Optimization Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card p-10 flex flex-col md:flex-row gap-12 group overflow-hidden border-cyan/20"
          >
            <div className="flex-1">
               <div className="w-16 h-16 glass-card bg-cyan/5 border-cyan/20 flex items-center justify-center text-cyan mb-8 neon-glow-cyan">
                  <Navigation size={32} />
               </div>
               <h3 className="text-4xl font-black text-white mb-4 italic">Neural Pathfinding</h3>
               <p className="text-slate-400 text-lg leading-relaxed">
                  Real-time Dijkstra implementation that recalculates route weights instantly as disruptions are detected. Our engine processes 40,000+ data points per second.
               </p>
               <div className="mt-8 flex gap-4">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Precision</p>
                    <p className="text-xl font-black text-white font-mono tracking-tighter">94.8%</p>
                  </div>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Latency</p>
                    <p className="text-xl font-black text-acid font-mono tracking-tighter">0.42ms</p>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-64 h-64 md:h-auto bg-slate-950 rounded-2xl border border-white/5 relative flex items-center justify-center">
               <div className="scanline-laser opacity-20" />
               <Network size={80} className="text-cyan/20 animate-pulse" />
            </div>
          </motion.div>

          {/* Item 2: Chaos Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-magenta/20 group hover:border-magenta/50"
          >
            <div className="w-14 h-14 glass-card bg-magenta/5 border-magenta/20 flex items-center justify-center text-magenta mb-8">
              <ShieldAlert size={28} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Chaos Simulation</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Stress-test your network with simultaneous global disruptions. Predict the unpredictable with 100% synthetic accuracy.
            </p>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
               <motion.div
                 initial={{ width: 0 }}
                 whileInView={{ width: "85%" }}
                 transition={{ duration: 1 }}
                 className="h-full bg-magenta"
               />
            </div>
          </motion.div>

          {/* Item 3: Live Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 border-acid/20 group hover:border-acid/50"
          >
            <div className="w-14 h-14 glass-card bg-acid/5 border-acid/20 flex items-center justify-center text-acid mb-8">
              <Activity size={28} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Live Telemetry</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ultra-low latency WebSocket integration ensures your dashboard reflects the heartbeat of your fleet with sub-second accuracy.
            </p>
          </motion.div>

          {/* Item 4: Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card p-10 flex items-center gap-12 overflow-hidden"
          >
            <div className="w-24 h-24 flex-shrink-0 glass-card flex items-center justify-center text-white/20">
              <Lock size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white mb-4">Ironclad Command Protocol</h3>
              <p className="text-slate-400 leading-relaxed">
                End-to-end encrypted command signals ensure your logistical data remains proprietary. We use military-grade AES-256 encryption for all node-to-node telemetry.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Technical Stack Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div>
              <p className="text-[10px] font-black text-cyan uppercase tracking-[0.4em] mb-4">The Engine Room</p>
              <h2 className="text-5xl font-black text-white mb-10 tracking-tighter">Mission-Critical <br />Architecture.</h2>

              <div className="space-y-6">
                {[
                  { icon: Database, title: "Data Ingestion", desc: "Multi-source streaming from IoT sensors and global APIs." },
                  { icon: Brain, title: "Inference Engine", desc: "ML models identifying 'shadow risks' before they manifest." },
                  { icon: Zap, title: "Execution Logic", desc: "Sub-millisecond rerouting via parallel graph processing." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="w-12 h-12 glass-card flex items-center justify-center text-cyan"><item.icon size={20} /></div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="relative aspect-video glass-card border-white/5 overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover opacity-20 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                 <Globe size={64} className="text-cyan mb-6 animate-pulse neon-glow-cyan" />
                 <p className="text-2xl font-black text-white italic">Global Node Synchronization Active</p>
                 <p className="text-slate-500 mt-2 font-mono text-[10px] tracking-widest uppercase">Encryption_Status: SECURE</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
