import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, ScanLine, Binary } from 'lucide-react';

const AIThinkingLoader = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-dark/90 backdrop-blur-md overflow-hidden"
        >
          {/* Animated Background Scanlines */}
          <div className="absolute inset-0 scanline opacity-20" />

          <div className="relative text-center flex flex-col items-center">
            {/* Spinning Brain/CPU Core */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center mb-12 relative shadow-[0_0_50px_rgba(56,189,248,0.2)]"
            >
              <Cpu size={60} className="text-primary animate-pulse" />

              {/* Orbital Nodes */}
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-primary rounded-sm flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{
                    transform: `rotate(${angle}deg) translateX(70px)`
                  }}
                >
                  <Binary size={10} className="text-dark font-black" />
                </motion.div>
              ))}
            </motion.div>

            {/* Tactical Text readout */}
            <div className="space-y-4 font-mono">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-black text-white tracking-[0.2em] flex items-center gap-4"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                AI OPTIMIZATION IN PROGRESS
              </motion.h2>

              <div className="flex flex-col gap-2">
                <p className="text-primary/70 text-xs font-bold tracking-[0.3em] uppercase">Analyzing 1,248 Route Parameters...</p>
                <div className="w-64 h-1 bg-white/5 mx-auto rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-primary glow-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 opacity-40">
                <div className="text-left flex items-center gap-3">
                  <Database size={16} />
                  <span className="text-[10px] font-bold">NODE_SYNC: 100%</span>
                </div>
                <div className="text-right flex items-center gap-3 justify-end">
                  <ScanLine size={16} />
                  <span className="text-[10px] font-bold">LATENCY: 2.4MS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIThinkingLoader;
