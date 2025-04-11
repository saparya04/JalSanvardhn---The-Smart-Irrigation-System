import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion"; // Use framer-motion
import { twMerge } from "tailwind-merge";
import clsx from "clsx"; // Replacing `cn` with `clsx`

export const TextRevealCard = ({ text, revealText, children, className }) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(width);
    }
  }, []);

  const mouseMoveHandler = (event) => {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  };

  const mouseLeaveHandler = () => {
    setIsMouseOver(false);
    setWidthPercentage(0);
  };

  const mouseEnterHandler = () => {
    setIsMouseOver(true);
  };

  const touchMoveHandler = (event) => {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  };

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
  onMouseEnter={mouseEnterHandler}
  onMouseLeave={mouseLeaveHandler}
  onMouseMove={mouseMoveHandler}
  onTouchStart={mouseEnterHandler}
  onTouchEnd={mouseLeaveHandler}
  onTouchMove={touchMoveHandler}
  ref={cardRef}
  className={clsx(
    "bg-white/5 backdrop-blur-md border border-white/10 shadow-xl w-[40rem] rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl",
    className
  )}
>
  {children}

  <div className="h-40 relative flex items-center overflow-hidden">
    {/* Reveal Layer */}
    <motion.div
      style={{ width: "100%" }}
      animate={
        isMouseOver
          ? {
              opacity: widthPercentage > 0 ? 1 : 0,
              clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
            }
          : {
              clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
            }
      }
      transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
      className="absolute bg-black/70 z-20 will-change-transform"
    >
      <p
        style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.3)" }}
        className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-green-400 to-green-200"
      >
        {revealText}
      </p>
    </motion.div>

    {/* Divider Line */}
    <motion.div
      animate={{
        left: `${widthPercentage}%`,
        rotate: `${rotateDeg}deg`,
        opacity: widthPercentage > 0 ? 1 : 0,
      }}
      transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
      className="h-40 w-[6px] bg-gradient-to-b from-transparent via-white/70 to-transparent absolute z-50 will-change-transform"
    />

    {/* Base Layer */}
    <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
      <p className="text-base sm:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
        {text}
      </p>
      <MemoizedStars />
    </div>
  </div>
</div>

  );
};

export const TextRevealCardTitle = ({ children, className }) => {
  return (
    <h2 className={twMerge("text-green-700 text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({ children, className }) => {
  return (
    <p className={twMerge("text-green-800 text-sm", className)}>{children}</p>
  );
};

// Green Particles (Stars)
const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(80)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `5px`,
            height: `5px`,
            backgroundColor: "#16a34a",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        />
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
