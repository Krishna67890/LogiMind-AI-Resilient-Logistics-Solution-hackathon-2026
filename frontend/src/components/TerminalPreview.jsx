import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalPreview = () => {
  const [logs, setLogs] = useState([
    { text: "[ 0.000000] Initializing LogiMind_Core v3.8.2...", type: 'info' },
    { text: "[ 0.042182] Connecting to Neural_Graph_001... SUCCESS", type: 'success' },
    { text: "[ 0.128412] Scanning Cluster_North... No Disruptions Detected", type: 'info' },
  ]);

  const terminalRef = useRef(null);

  const possibleLogs = [
    { text: "OPTIMIZING FLEET_ALPHA: New Path Calculated via Nexus-9", type: 'success' },
    { text: "WARNING: Traffic Spike in Sector_7 (Recalculating...)", type: 'warning' },
    { text: "Syncing Global Fleet State... 100% Complete", type: 'info' },
    { text: "LM-204 telemetry received: Fuel 82% | Status: Nominal", type: 'info' },
    { text: "Neural Link precision increased to 99.98%", type: 'success' },
    { text: "Anomaly detected in Grid SNS_42: Sensor Ghosting", type: 'warning' },
    { text: "Rerouting LM-109 via High-Ground-Alpha", type: 'success' },
    { text: "Dark Fiber Mesh integrity verified.", type: 'info' },
    { text: "Mission Report TACTICAL_PRINT_72 initialized.", type: 'success' },
    { text: "Threat Level upgraded to AGGRESSIVE", type: 'warning' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
      const timestamp = (performance.now() / 1000).toFixed(6);
      setLogs(prev => [...prev, { text: `[ ${timestamp}] ${randomLog.text}`, type: randomLog.type }].slice(-10));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={terminalRef}
      className="glass-card p-6 bg-black font-mono text-[11px] leading-relaxed overflow-hidden h-[200px] relative border-white/5"
    >
      <div className="scanline-laser opacity-10 pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-5 pointer-events-none" />

      <div className="flex flex-col gap-1">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={log.text + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`${
                log.type === 'warning' ? 'text-magenta' :
                log.type === 'success' ? 'text-acid' :
                'text-slate-500'
              }`}
            >
              <span className="opacity-50 mr-2">&gt;</span>
              {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-cyan/50 inline-block"
        />
      </div>

      {/* Terminal HUD info overlay */}
      <div className="absolute bottom-2 right-4 text-[7px] font-mono text-slate-800 uppercase tracking-widest pointer-events-none">
        STREAM_ACTIVE // NODE_72
      </div>
    </div>
  );
};

export default TerminalPreview;
