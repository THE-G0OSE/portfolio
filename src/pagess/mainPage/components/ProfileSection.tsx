"use client";

import { EMPTY_PROFILE, IPortfolio } from "@/entities/portfolio";
import { DesktopBoard } from "@/pagess/mainPage/components/DesktopBoard";
import { Masthead } from "@/pagess/mainPage/components/Masthead";
import { MobileBoard } from "@/pagess/mainPage/components/MobileBoard";
import { PageFooter } from "@/pagess/mainPage/components/PageFooter";
import { AvatarCard } from "@/pagess/mainPage/components/profileCards/avatar/AvatarCard";
import { DecoPlateCard } from "@/pagess/mainPage/components/profileCards/decoPlate/DecoPlateCard";
import { ExperienceCard } from "@/pagess/mainPage/components/profileCards/experience/ExperienceCard";
import { HeroFileCard } from "@/pagess/mainPage/components/profileCards/heroFile/HeroFileCard";
import { PowerSwitchCard } from "@/pagess/mainPage/components/profileCards/powerSwitch/PowerSwitchCard";
import { SocialsCard } from "@/pagess/mainPage/components/profileCards/socials/SocialsCard";
import { StackCard } from "@/pagess/mainPage/components/profileCards/stack/StackCard";
import { MOBILE_QUERY } from "@/shared/config";
import { Flex } from "@/shared/containers";
import { useMediaQuery } from "@/shared/lib";
import { MotionConfig } from "motion/react";

interface IProps {
  portfolio: IPortfolio;
}

export const ProfileSection: React.FC<IProps> = ({ portfolio }) => {
  const { stack, jobs, projects, socials } = portfolio;
  const profile = portfolio.profile ?? EMPTY_PROFILE;
  // switching boards remounts the cards, so they replay the intro in the new layout
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const Board = isMobile ? MobileBoard : DesktopBoard;

  return (
    <MotionConfig reducedMotion="user">
      {/* 1370px = board width + desktop paddings */}
      <Flex
        vert
        gap={"22px"}
        className="mx-auto px-4 lg:px-10 pt-5 lg:pt-7 pb-10 lg:pb-12 w-full max-w-140 lg:max-w-342.5"
      >
        <Masthead profile={profile} />
        <Board>
          <AvatarCard profile={profile} />
          <HeroFileCard profile={profile} />
          <PowerSwitchCard categories={stack} />
          <StackCard categories={stack} />
          <ExperienceCard jobs={jobs} projects={projects} />
          <SocialsCard socials={socials} totalFlock={profile.totalFlock} />
          <DecoPlateCard />
        </Board>
        <PageFooter name={profile.name} />
      </Flex>
    </MotionConfig>
  );
};
