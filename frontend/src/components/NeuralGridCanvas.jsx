import React, { useRef, useEffect } from 'react';

const NeuralGridCanvas = ({ activeScenario, isChaosMode, darkFiber = true, globalMode = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let scanLineY = 0;
    let frameCount = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const nodeCount = isChaosMode ? 120 : (darkFiber ? 45 : 18);
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isChaosMode ? 4 : 0.6),
        vy: (Math.random() - 0.5) * (isChaosMode ? 4 : 0.6),
        radius: Math.random() * (isChaosMode ? 2.5 : 1.5) + 0.5,
        color: globalMode ? 'rgba(255, 255, 255, 0.4)' : (
               activeScenario === 'rain' ? 'rgba(0, 242, 255, 0.5)' :
               activeScenario === 'accident' ? 'rgba(255, 0, 255, 0.5)' :
               isChaosMode ? 'rgba(239, 68, 68, 0.6)' : 'rgba(0, 242, 255, 0.3)'
        )
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      if (globalMode) {
        ctx.fillStyle = 'rgba(0, 10, 20, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Scan line for Global Mode
        scanLineY = (scanLineY + 2) % canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, scanLineY);
        ctx.lineTo(canvas.width, scanLineY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Grain/Noise
        if (frameCount % 2 === 0) {
          for (let i = 0; i < 100; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
          }
        }
      }

      // Draw Grid Lines (Subtle)
      ctx.strokeStyle = globalMode ? 'rgba(255, 255, 255, 0.08)' : (isChaosMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 242, 255, 0.05)');
      ctx.lineWidth = 0.5;
      const step = 50;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Chaos Glitch Lines
      if (isChaosMode && Math.random() > 0.92) {
        ctx.beginPath();
        const gy = Math.random() * canvas.height;
        ctx.moveTo(0, gy);
        ctx.lineTo(canvas.width, gy + (Math.random() - 0.5) * 50);
        ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 0, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw and Move Nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Connect nearby nodes
        nodes.forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const connectDist = isChaosMode ? 180 : 120;

          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const alpha = (isChaosMode ? 0.3 : 0.2) * (1 - dist / connectDist);
            ctx.strokeStyle = globalMode ? `rgba(255, 255, 255, ${alpha})` : (
                             activeScenario === 'rain' ? `rgba(0, 242, 255, ${alpha})` :
                             activeScenario === 'accident' ? `rgba(255, 0, 255, ${alpha})` :
                             isChaosMode ? `rgba(239, 68, 68, ${alpha})` : `rgba(0, 242, 255, ${alpha})`
            );
            ctx.lineWidth = isChaosMode ? 1.5 : 0.8;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeScenario, isChaosMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default NeuralGridCanvas;
