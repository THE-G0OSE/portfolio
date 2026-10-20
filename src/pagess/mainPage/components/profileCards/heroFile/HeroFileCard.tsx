import { IProfile } from "@/entities/portfolio";
import {
  heroFileVariants,
  xpFillVariants,
  xpMarkerVariants,
} from "@/pagess/mainPage/components/profileCards/heroFile/animations";
import { Burst, Caption } from "@/shared/comic";
import { ProfileCard } from "@/widgets/profileCard";
import { motion } from "motion/react";

const XP_PLACEHOLDER = 28;

const BAR_TICKS =
  "repeating-linear-gradient(90deg, transparent 0 calc(10% - 2px), var(--color-ink) calc(10% - 2px) 10%)";

interface IProps {
  profile: IProfile;
}

export const HeroFileCard: React.FC<IProps> = ({ profile }) => {
  const { age, yearsInIt, hatchedYear, firstCodeYear } = profile;

  const ageText = age > 0 ? String(age) : "[AGE]";
  const itText = yearsInIt > 0 ? String(yearsInIt) : "[N]";
  const xp = age > 0 && yearsInIt > 0 ? Math.min(100, Math.round((yearsInIt / age) * 100)) : XP_PLACEHOLDER;
  const xpPct = `${xp}%`;

  return (
    <ProfileCard
      variants={heroFileVariants}
      order={1}
      // phones: level becomes a strip above the full width xp bar
      className="gap-4 max-lg:gap-5 grid grid-cols-[120px_minmax(0,1fr)] max-lg:grid-cols-1 bg-cream pt-10 pr-4.5 max-lg:pr-3 pb-4 pl-4 max-lg:pl-3"
      noFullScreen
    >
      <Caption className="top-2 left-2.5 absolute">Hero file Nº 001</Caption>
      <div className="top-2 right-3 absolute px-2 border-3 border-comic-red font-bangers text-comic-red text-lg rotate-6">
        CLASSIFIED
      </div>
      <div className="flex max-lg:flex-row flex-col justify-center max-lg:justify-start items-center max-lg:items-baseline max-lg:gap-2.5 shadow-[4px_4px_0_var(--color-comic-red)] max-lg:px-3 max-lg:py-1.5 border-4 border-ink ht-ink">
        <span className="font-bangers text-white text-xl leading-none">LEVEL</span>
        <span className={`font-bangers text-comic-yellow leading-[.95] ${age > 0 ? "text-[64px] max-lg:text-[44px]" : "text-[40px] max-lg:text-[32px]"}`}>{ageText}</span>
        <span className="font-bold text-[11px] text-white uppercase">years old</span>
      </div>
      <div className="flex flex-col justify-center gap-2 min-w-0">
        <div className="flex justify-between items-baseline gap-2 text-nowrap">
          <span className="font-bangers text-lg">XP · CODE MODE</span>
          <span className="font-bangers text-[26px] text-comic-red">{itText} YRS</span>
        </div>
        <div style={{ backgroundImage: BAR_TICKS }} className="relative bg-white border-4 border-ink h-8.5">
          <motion.div
            variants={xpFillVariants}
            style={{ width: xpPct }}
            className="top-0 right-0 bottom-0 absolute border-ink border-l-4 origin-right ht-red"
          />
          <div style={{ right: xpPct }} className="-top-5.5 absolute -mr-5">
            <Burst size={40} outline={0} fillClassName="bg-comic-yellow" variants={xpMarkerVariants} />
          </div>
        </div>
        <div className="flex justify-between gap-1 font-bold text-[11px] text-nowrap uppercase">
          <span>Hatched {hatchedYear}</span>
          <span>First code {firstCodeYear}</span>
          <span>Now</span>
        </div>
      </div>
    </ProfileCard>
  );
};
