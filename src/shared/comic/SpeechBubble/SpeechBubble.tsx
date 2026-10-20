"use client";

import { motion, Variants } from "motion/react";

interface IProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}

export const SpeechBubble: React.FC<IProps> = ({ children, variants, className = "" }) => {
  return (
    <motion.div
      variants={variants}
      className={`absolute z-3 flex justify-center items-center bg-white border-3 border-ink rounded-[50%] font-comic font-bold text-ink text-center ${className}`}
    >
      {children}
      <span className="-bottom-3 left-[28%] absolute bg-white border-ink border-r-3 border-b-3 size-6.5 rotate-80 skew-x-32" />
    </motion.div>
  );
};
