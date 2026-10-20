import { createCardVariants, ICardVariants } from "@/widgets/profileCard";
import { stagger, Variants } from "motion";

export const stackVariants: ICardVariants = createCardVariants(
  3,
  { y: 200, opacity: 0 },
  { duration: 2, ease: "anticipate" },
);

export const stackPageVariants: Variants = {
  start: { opacity: 0 },
  end: { opacity: 1, transition: { duration: 0.15, delayChildren: stagger(0.06) } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const stackItemVariants: Variants = {
  start: { x: 24, opacity: 0 },
  end: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// fullscreen: appears while the card is still growing, columns pop in one by one
export const arsenalVariants: Variants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.3, delayChildren: stagger(0.08, { startDelay: 0.4 }) },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const arsenalColumnVariants: Variants = {
  start: { opacity: 0, y: 30 },
  end: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 20 } },
};
