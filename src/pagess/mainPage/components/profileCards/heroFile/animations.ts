import { createCardVariants, createContentVariants, ICardVariants } from "@/widgets/profileCard";
import { Variants } from "motion";

export const heroFileVariants: ICardVariants = createCardVariants(
  1,
  { y: -100, opacity: 0 },
  { duration: 1.5, ease: "anticipate" },
);

export const xpFillVariants: Variants = createContentVariants({
  start: { scaleX: 0 },
  end: { scaleX: 1, transition: { duration: 1.4, delay: 1.6, ease: [0.2, 1, 0.3, 1] } },
});

export const xpMarkerVariants: Variants = createContentVariants({
  start: { scale: 0, rotate: -20 },
  end: {
    scale: 1,
    rotate: -6,
    transition: { type: "spring", stiffness: 260, damping: 12, delay: 2.6 },
  },
});
