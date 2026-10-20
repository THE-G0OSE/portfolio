import { Variants } from "motion";

export const burstPopVariants: Variants = {
  start: { scale: 0, rotate: -20 },
  end: {
    scale: 1,
    rotate: -6,
    transition: { type: "spring", stiffness: 260, damping: 12 },
  },
};
