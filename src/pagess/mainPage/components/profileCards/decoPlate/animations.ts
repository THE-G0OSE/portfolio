import { createCardVariants, ICardVariants } from "@/widgets/profileCard";

export const decoPlateVariants: ICardVariants = createCardVariants(
  6,
  { y: -50, opacity: 0 },
  { duration: 2, ease: "anticipate" },
);
