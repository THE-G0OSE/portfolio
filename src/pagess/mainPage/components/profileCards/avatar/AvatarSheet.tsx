import { IProfile } from "@/entities/portfolio";
import { HeroDossierContent } from "@/pagess/mainPage/components/profileCards/avatar/HeroDossierContent";
import { SpeechBubble } from "@/shared/comic";
import { sheetItemVariants } from "@/widgets/profileCard";
import Image from "next/image";
import { motion } from "motion/react";

interface IProps {
  profile: IProfile;
}

// phones: expanded hero card as a full page
export const AvatarSheet: React.FC<IProps> = ({ profile }) => {
  return (
    <div className="flex flex-col gap-4">
      <motion.h2 variants={sheetItemVariants} className="font-bangers text-[44px] leading-none">
        CHAPTER 1: <span className="text-comic-red">THE HERO</span>
      </motion.h2>

      <motion.div
        variants={sheetItemVariants}
        className="relative shadow-[5px_5px_0_var(--color-ink)] border-5 border-ink h-105 overflow-hidden ht-blue"
      >
        <Image
          src="/images/avatar.jpg"
          alt="The Goose in a top hat, monocle and pipe"
          fill
          sizes="(width < 40rem) 100vw, 640px"
          className="object-cover object-top"
        />
        <SpeechBubble className="bottom-7 left-3 px-4 py-3 w-[min(82%,300px)] h-32 text-[17px] leading-[1.15]">
          <span className="flex flex-col items-center gap-1">
            <span>HONK! I mean… hi, I&apos;m {profile.name}.</span>
            <span className="font-normal text-[0.85em]">{profile.tagline || "[Short punchy line]"}</span>
          </span>
        </SpeechBubble>
      </motion.div>

      <HeroDossierContent profile={profile} itemVariants={sheetItemVariants} />
    </div>
  );
};
