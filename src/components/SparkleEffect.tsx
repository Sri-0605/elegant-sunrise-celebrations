
import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

const SparkleEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const gridSize = 38; // Approximately 1cm (38px)
  const areaSize = 190; // Approximately 5cm (190px)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      '#1EAEDB', // Bright blue
      '#0EA5E9', // Ocean blue
    ];

    const createSparkle = (x: number, y: number): Sparkle => ({
      x,
      y,
      size: Math.random() < 0.5 ? 6 : 8, // Larger sizes
      opacity: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const getGridPosition = (x: number, y: number) => {
      const gridX = Math.floor(x / gridSize) * gridSize + gridSize / 2;
      const gridY = Math.floor(y / gridSize) * gridSize + gridSize / 2;
      return { gridX, gridY };
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparkles
      sparklesRef.current.forEach((sparkle) => {
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        // Make the dots more subtle by reducing max opacity
        ctx.fillStyle = sparkle.color.replace('1)', `${sparkle.opacity * 0.4})`);
        ctx.fill();

        // Slower fade in for subtlety
        if (sparkle.opacity < 0.8) {
          sparkle.opacity += 0.05;
        }
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    const isOverElement = (x: number, y: number) => {
      const elements = document.elementsFromPoint(x, y);
      return elements.some(element => {
        if (element === canvas || element.tagName === 'BODY' || element.tagName === 'HTML') {
          return false;
        }
        const style = window.getComputedStyle(element);
        return style.backgroundImage !== 'none' || 
               element.tagName === 'IMG' || 
               style.backgroundColor !== 'rgba(0, 0, 0, 0)';
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isOverElement(e.clientX, e.clientY)) {
        sparklesRef.current = [];
        return;
      }

      const { gridX, gridY } = getGridPosition(x, y);
      
      // Clear previous sparkles
      sparklesRef.current = [];
      
      // Create sparkles in a 5cm x 5cm grid around the cursor with 1cm spacing
      for (let offsetX = -areaSize; offsetX <= areaSize; offsetX += gridSize) {
        for (let offsetY = -areaSize; offsetY <= areaSize; offsetY += gridSize) {
          const sparkleX = gridX + offsetX;
          const sparkleY = gridY + offsetY;
          
          // Only add sparkles within 5cm radius
          const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
          if (distance <= areaSize) {
            sparklesRef.current.push(createSparkle(sparkleX, sparkleY));
          }
        }
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
