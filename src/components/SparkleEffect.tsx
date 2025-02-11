
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
      '#8B5CF6', // Vivid Purple
      '#D946EF', // Magenta Pink
      '#F97316', // Bright Orange
    ];

    const createSparkle = (x: number, y: number): Sparkle => ({
      x,
      y,
      size: Math.random() * (16 - 8) + 8, // Larger random size between 8 and 16
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
      sparklesRef.current = sparklesRef.current.filter(sparkle => sparkle.opacity > 0);
      
      sparklesRef.current.forEach((sparkle) => {
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        ctx.fillStyle = sparkle.color.replace('1)', `${sparkle.opacity})`); // Full opacity
        ctx.fill();

        // Smoother fade in/out but faster
        if (sparkle.opacity < 1) {
          sparkle.opacity += 0.08; // Even faster fade in
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
        // Fade out existing sparkles
        sparklesRef.current.forEach(sparkle => {
          sparkle.opacity = Math.max(0, sparkle.opacity - 0.1);
        });
        return;
      }

      const { gridX, gridY } = getGridPosition(x, y);
      
      // Create sparkles in a 5cm x 5cm grid around the cursor with 1cm spacing
      const newSparkles: Sparkle[] = [];
      
      for (let offsetX = -areaSize; offsetX <= areaSize; offsetX += gridSize * 1.5) {
        for (let offsetY = -areaSize; offsetY <= areaSize; offsetY += gridSize * 1.5) {
          const sparkleX = gridX + offsetX + (Math.random() * gridSize - gridSize/2) * 0.5;
          const sparkleY = gridY + offsetY + (Math.random() * gridSize - gridSize/2) * 0.5;
          
          // Only add sparkles within a randomized radius
          const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
          const randomizedAreaSize = areaSize * (0.8 + Math.random() * 0.4);
          
          if (distance <= randomizedAreaSize) {
            newSparkles.push(createSparkle(sparkleX, sparkleY));
          }
        }
      }

      // Update sparkles array with new sparkles
      sparklesRef.current = [...sparklesRef.current.filter(s => s.opacity > 0.1), ...newSparkles];
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
    />
  );
};

export default SparkleEffect;
