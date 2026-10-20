import { createCardVariants, ICardVariants } from "@/widgets/profileCard";

export const socialsVariants: ICardVariants = createCardVariants(
  5,
  { x: -100, opacity: 0 },
  { duration: 2, ease: "anticipate" },
);
