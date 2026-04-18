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
    { id: 1, x: 120, y: 140 }, { id: 2, x: 220, y: 350 }, { id: 3, x: 480, y: 180 },
    { id: 4, x: 520, y: 400 }, { id: 5, x: 720, y: 500 }, { id: 6, x: 600, y: 150 }
  ];

  const connections = [
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 },
    { from: 3, to: 4 }, { from: 3, to: 6 }, { from: 4, to: 5 },
    { from: 6, to: 5 }
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

        {/* Pathfinding connections */}
        {connections.map((conn, i) => {
          const from = capitalNodes.find(n => n.id === conn.from);
          const to = capitalNodes.find(n => n.id === conn.to);
          return (
            <motion.line
              key={`conn-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#00f2ff"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 2, delay: 1 + i * 0.2 }}
            />
          );
        })}

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
