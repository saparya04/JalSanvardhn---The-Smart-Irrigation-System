// import React from "react";
// import { motion } from "framer-motion";

// const bubbleVariants = {
//   animate: {
//     y: [0, -200],
//     opacity: [1, 0],
//     transition: {
//       duration: 8,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// const Bubble = ({ x, size, delay }) => (
//   <motion.div
//     className="absolute bottom-0 rounded-full bg-green-300/30"
//     style={{
//       width: `${size}px`,
//       height: `${size}px`,
//       left: `${x}%`,
//     }}
//     variants={bubbleVariants}
//     initial={{ y: 0, opacity: 1 }}
//     animate="animate"
//     transition={{ delay }}
//   />
// );

// const BubbleBackground = () => {
//   const bubbles = Array.from({ length: 20 }, (_, i) => ({
//     x: Math.random() * 100,
//     size: 20 + Math.random() * 40,
//     delay: Math.random() * 5,
//   }));

//   return (
//     <div className="absolute inset-0 z-[-20] overflow-hidden pointer-events-none">
//       {bubbles.map((b, i) => (
//         <Bubble key={i} x={b.x} size={b.size} delay={b.delay} />
//       ))}
//     </div>
//   );
// };

// export default BubbleBackground;


//claven
// components/BubbleBackground.jsx
import React, { useEffect, useRef } from "react";

export default function BubbleBackground() {
  const canvasRef = useRef(null);
  const bubbles = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    class Bubble {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 15 + Math.random() * 30;
        this.color = `rgba(88, 129, 87, ${Math.random() * 0.6 + 0.2})`; // greenish
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off walls
        if (this.x + this.radius > width || this.x - this.radius < 0) this.dx *= -1;
        if (this.y + this.radius > height || this.y - this.radius < 0) this.dy *= -1;

        this.draw();
      }
    }

    for (let i = 0; i < 35; i++) {
      bubbles.push(new Bubble());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach((b) => b.update());
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
