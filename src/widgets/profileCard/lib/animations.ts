import { stagger, Variants } from "motion";

// phones: full page sheet with expanded card content, pops in like a new comic page
export const sheetVariants: Variants = {
  start: { opacity: 0, scale: 0.92, rotate: 1.5 },
  end: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.45, ease: [0.2, 1.3, 0.4, 1], delayChildren: stagger(0.06, { startDelay: 0.15 }) },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

// sheet content items appear one by one
export const sheetItemVariants: Variants = {
  start: { opacity: 0, y: 18 },
  end: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 22 } },
};

// "MORE" sticker on cards that open a sheet, lands after the card
export const moreTagVariants: Variants = {
  start: { opacity: 0, scale: 0.5, rotate: -14 },
  end: {
    opacity: 1,
    scale: 1,
    rotate: -3,
    transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.8 },
  },
};
