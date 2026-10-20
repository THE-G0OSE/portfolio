"use client"

import { TextBlickVariants } from '@/shared/containers/Blink/animations';
import { motion } from 'motion/react';

interface IProps {
    children: React.ReactNode
}

export const Blink: React.FC<IProps> = ({children}) => {
  return (
    <div className="relative w-min overflow-hidden">
        {children}
        <motion.div variants={TextBlickVariants} initial="start" animate="end"  className="top-0 absolute bg-white shadow-blink w-4 h-full skew-x-30" />
    </div>
  )
}
