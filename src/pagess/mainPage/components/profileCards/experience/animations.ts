import { createCardVariants, ICardVariants } from "@/widgets/profileCard";

export const experienceVariants: ICardVariants = createCardVariants(
  4,
  { scale: 0.4, opacity: 0, y: 80, rotateX: -60 },
  { duration: 2, ease: "anticipate" },
  { rotateX: 0 },
);
