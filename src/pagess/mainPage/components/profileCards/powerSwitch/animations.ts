import { createCardVariants, ICardVariants } from "@/widgets/profileCard";

export const powerSwitchVariants: ICardVariants = createCardVariants(
  2,
  { x: 100, opacity: 0 },
  { duration: 1, ease: "anticipate" },
);
