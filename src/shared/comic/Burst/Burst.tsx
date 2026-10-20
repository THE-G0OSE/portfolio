"use client";

import { burstPopVariants } from "@/shared/comic/Burst/animations";
import { motion, Variants } from "motion/react";

interface IProps {
  children?: React.ReactNode;
  points?: 12 | 16;
  size: number;
  // background + text color classes of the inner burst, e.g. "bg-comic-yellow text-ink"
  fillClassName: string;
  outline?: number;
  variants?: Variants;
  className?: string;
}

export const Burst: React.FC<IProps> = ({
  children,
  points = 12,
  size,
  fillClassName,
  outline = 6,
  variants = burstPopVariants,
  className = "",
}) => {
  const clip = points === 12 ? "burst-12" : "burst-16";
  const innerSize = size - outline * 2;

  return (
    <motion.div
      variants={variants}
      style={{ width: size, height: size }}
      className={`flex justify-center items-center bg-ink ${clip} ${className}`}
    >
      <div
        style={{ width: innerSize, height: innerSize }}
        className={`flex justify-center items-center font-bangers ${clip} ${fillClassName}`}
      >
        {children}
      </div>
    </motion.div>
  );
};
