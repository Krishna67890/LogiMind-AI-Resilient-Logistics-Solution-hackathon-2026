import React from 'react';
import { motion } from 'framer-motion';

const GlobalMapOverlay = () => {
  // Simplified world map paths
  const continents = [
    { name: 'North America', path: "M 50,150 L 150,100 L 250,120 L 200,250 L 100,280 Z" },
    { name: 'South America', path: "M 200,280 L 250,300 L 230,450 L 180,400 Z" },
    { name: 'Eurasia', path: "M 400,100 L 650,80 L 750,200 L 700,350 L 450,300 L 420,200 Z" },
    { name: 'Africa', path: "M 420,320 L 550,320 L 580,450 L 500,550 L 400,480 Z" },
    { name: 'Australia', path: "M 650,450 L 750,450 L 780,550 L 680,550 Z" }
  ];

  const capitalNodes = [
    { x: 120, y: 140 }, { x: 220, y: 350 }, { x: 480, y: 180 },
    { x: 520, y: 400 }, { x: 720, y: 500 }, { x: 600, y: 150 }
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="mapGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#00f2ff" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {continents.map((continent, index) => (
          <motion.path
            key={index}
            d={continent.path}
            fill="rgba(0, 242, 255, 0.02)"
            stroke="#00f2ff"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, delay: index * 0.4, ease: "easeInOut" }}
            filter="url(#mapGlow)"
          />
        ))}

        {capitalNodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="2"
              fill="#00f2ff"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="url(#nodeGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 2, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
          </g>
        ))}

        {/* Tactical scanning horizontal lines */}
        {[...Array(15)].map((_, i) => (
          <motion.line
            key={i}
            x1="0"
            y1={i * 40}
            x2="800"
            y2={i * 40}
            stroke="#00f2ff"
            strokeWidth="0.1"
            strokeDasharray="2 10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default GlobalMapOverlay;
