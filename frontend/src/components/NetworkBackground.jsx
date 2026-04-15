import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NetworkBackground = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const lines = svgRef.current.querySelectorAll('.moving-line');
    lines.forEach((line) => {
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 3 + Math.random() * 5,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 2
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        {/* Randomized background paths */}
        <path className="moving-line" d="M 0 100 L 1000 900" stroke="#00f2fe" strokeWidth="0.5" fill="none" />
        <path className="moving-line" d="M 1000 100 L 0 900" stroke="#4facfe" strokeWidth="0.5" fill="none" />
        <path className="moving-line" d="M 200 0 L 800 1000" stroke="#f093fb" strokeWidth="0.5" fill="none" />
        <path className="moving-line" d="M 800 0 L 200 1000" stroke="#00f2fe" strokeWidth="0.5" fill="none" />
        <path className="moving-line" d="M 0 500 L 1000 500" stroke="#4facfe" strokeWidth="0.5" fill="none" />
        <path className="moving-line" d="M 500 0 L 500 1000" stroke="#f093fb" strokeWidth="0.5" fill="none" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark" />
    </div>
  );
};

export default NetworkBackground;
