import React, { useEffect, useRef } from 'react';

interface AmbientParticle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  pulseSpeed: number;
  color: string;
}

/**
 * Editorial Ambient Atmosphere:
 * Subtle, soft drifting micro-particles and warm ambient light motes,
 * creating an intimate aesthetic mood without distracting visual clutter.
 */
export const FloatingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm, pastel motes & soft light palette
    const colors = ['#FFB7B2', '#FFAAA6', '#FFDAC1', '#E2F0CB', '#C7CEEA', '#FFF1C5'];
    const count = Math.min(24, Math.floor(width / 55));
    const particles: AmbientParticle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1, // gently rising
        opacity: Math.random() * 0.35 + 0.1,
        targetOpacity: Math.random() * 0.35 + 0.1,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        // Soft shimmer
        p.opacity += (p.targetOpacity - p.opacity) * 0.02;
        if (Math.abs(p.targetOpacity - p.opacity) < 0.01) {
          p.targetOpacity = Math.random() * 0.4 + 0.1;
        }

        // Boundary wrap
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft ambient mote
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
