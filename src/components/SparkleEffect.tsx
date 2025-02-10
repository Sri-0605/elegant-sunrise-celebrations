
import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  velocityX: number;
  velocityY: number;
}

const SparkleEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSparkle = (x: number, y: number): Sparkle => ({
      x,
      y,
      size: Math.random() * 6 + 4, // Increased size
      opacity: Math.random() * 0.7 + 0.3, // More visible opacity
      life: 1,
      velocityX: (Math.random() - 0.5) * 1.5,
      velocityY: (Math.random() - 0.5) * 1.5,
    });

    const colors = [
      'rgba(255, 105, 180, opacity)', // Hot pink
      'rgba(255, 20, 147, opacity)',  // Deep pink
      'rgba(255, 192, 203, opacity)', // Pink
    ];

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparkles
      sparklesRef.current = sparklesRef.current.filter((sparkle) => {
        sparkle.life -= 0.01; // Faster fade out
        sparkle.x += sparkle.velocityX;
        sparkle.y += sparkle.velocityY;
        sparkle.opacity = sparkle.life * 0.8; // Maintain visibility while fading

        // Draw sparkle
        const color = colors[Math.floor(Math.random() * colors.length)].replace(
          'opacity',
          sparkle.opacity.toString()
        );
        
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        return sparkle.life > 0;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Add sparkles near cursor
      for (let i = 0; i < 3; i++) { // Create multiple sparkles per movement
        const offset = 30;
        sparklesRef.current.push(
          createSparkle(
            mouseRef.current.x + (Math.random() - 0.5) * offset,
            mouseRef.current.y + (Math.random() - 0.5) * offset
          )
        );
      }
    };

    // Initialize
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SparkleEffect;
