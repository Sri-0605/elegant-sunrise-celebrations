
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
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.5,
      life: 1,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2,
    });

    const colors = [
      'rgba(255, 182, 193, opacity)', // Light pink
      'rgba(255, 160, 180, opacity)', // Darker pink
      'rgba(255, 140, 170, opacity)', // Even darker pink
    ];

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new sparkles randomly across the screen
      if (sparklesRef.current.length < 50 && Math.random() < 0.1) {
        sparklesRef.current.push(
          createSparkle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }

      // Update and draw sparkles
      sparklesRef.current = sparklesRef.current.filter((sparkle) => {
        sparkle.life -= 0.002;
        sparkle.x += sparkle.velocityX;
        sparkle.y += sparkle.velocityY;

        // Bounce off edges
        if (sparkle.x <= 0 || sparkle.x >= canvas.width) sparkle.velocityX *= -1;
        if (sparkle.y <= 0 || sparkle.y >= canvas.height) sparkle.velocityY *= -1;

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

      // Add extra sparkles near cursor
      if (Math.random() < 0.3) {
        const offset = 20;
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
