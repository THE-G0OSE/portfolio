import { IProfile } from "@/entities/portfolio";
import {
  dossierItemVariants,
  dossierVariants,
} from "@/pagess/mainPage/components/profileCards/avatar/animations";
import { HeroDossierContent } from "@/pagess/mainPage/components/profileCards/avatar/HeroDossierContent";
import { useProfileCard } from "@/widgets/profileCard";
import { motion } from "motion/react";

interface IProps {
  profile: IProfile;
}

// extra hero info, visible only in the fullscreen card. Phones show it in the sheet instead
export const HeroDossier: React.FC<IProps> = ({ profile }) => {
  const { isFullScreen, isMobile } = useProfileCard();

  if (isMobile) return null;

  return (
    <motion.div
      variants={dossierVariants}
      inert={!isFullScreen}
      className={`top-[4%] right-[3%] bottom-[3%] left-[43%] z-2 absolute flex flex-col gap-3.5 ${
        isFullScreen ? "" : "pointer-events-none"
      }`}
    >
      {/* right side is taken by role badges */}
      <motion.h2 variants={dossierItemVariants} className="pr-[200px] font-bangers text-[46px] text-white leading-[.95] [-webkit-text-stroke:1.5px_var(--color-ink)] [text-shadow:4px_4px_0_var(--color-ink)]">
        CHAPTER 1:
        <br />
        <span className="text-comic-yellow">THE HERO</span>
      </motion.h2>

      <HeroDossierContent profile={profile} itemVariants={dossierItemVariants} />
    </motion.div>
  );
};
