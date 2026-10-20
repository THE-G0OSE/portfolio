import { IProfile } from "@/entities/portfolio";
import {
  avatarImageVariants,
  avatarVariants,
  basedInVariants,
  bubbleVariants,
  rolesVariants,
  roleVariants,
  taglineVariants,
} from "@/pagess/mainPage/components/profileCards/avatar/animations";
import { AvatarSheet } from "@/pagess/mainPage/components/profileCards/avatar/AvatarSheet";
import { HeroDossier } from "@/pagess/mainPage/components/profileCards/avatar/HeroDossier";
import { Caption, SpeechBubble } from "@/shared/comic";
import { ProfileCard } from "@/widgets/profileCard";
import Image from "next/image";
import { motion } from "motion/react";

const ROLES = [
  { text: "WEB", className: "bg-ink text-comic-yellow text-[30px]" },
  { text: "FULLSTACK", className: "bg-comic-yellow text-ink text-[34px] border-3 border-ink" },
  { text: "DEVELOPER", className: "bg-comic-red text-white text-[30px] border-3 border-ink" },
];

interface IProps {
  profile: IProfile;
}

// positions and sizes of the elements live in variants, see animations.ts
export const AvatarCard: React.FC<IProps> = ({ profile }) => {
  return (
    <ProfileCard
      variants={avatarVariants}
      order={0}
      className="ht-blue"
      mobileHeight={440}
      sheet={<AvatarSheet profile={profile} />}
      sheetLabel="hero profile"
    >
      <motion.div
        variants={avatarImageVariants}
        className="bottom-0 left-0 absolute border-ink border-r-5 h-full overflow-hidden"
      >
        <Image
          src="/images/avatar.jpg"
          alt="The Goose in a top hat, monocle and pipe"
          fill
          sizes="420px"
          // first image on the page (LCP)
          loading="eager"
          className="object-cover"
        />
      </motion.div>
      <Caption className="top-2.5 left-2.5 z-4 absolute -rotate-2">Meet our hero…</Caption>
      <SpeechBubble variants={bubbleVariants} className="px-4.5 py-3 leading-[1.15]">
        <span className="flex flex-col items-center gap-1">
          <span>HONK! I mean… hi, I&apos;m {profile.name}.</span>
          <motion.span variants={taglineVariants} className="block overflow-hidden font-normal text-[0.85em]">
            {profile.tagline || "[Short punchy line]"}
          </motion.span>
        </span>
      </SpeechBubble>
      <motion.div
        variants={rolesVariants}
        className="z-3 absolute flex flex-col items-end gap-1 origin-bottom-right"
      >
        {ROLES.map(({ text, className }) => (
          <motion.p key={text} variants={roleVariants} className={`px-2.5 font-bangers ${className}`}>
            {text}
          </motion.p>
        ))}
      </motion.div>
      <motion.div variants={basedInVariants} className="bottom-2.5 left-2.5 z-4 absolute">
        <Caption white>Based in {profile.location}</Caption>
      </motion.div>
      <HeroDossier profile={profile} />
    </ProfileCard>
  );
};
