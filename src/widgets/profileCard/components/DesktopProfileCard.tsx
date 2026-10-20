import { CardOrder, getCardGridStyle } from "@/widgets/profileCard/lib/helpers";
import { useProfileCardAnimations } from "@/widgets/profileCard/lib/hooks/useProfileCardAnimations";
import { ProfileCardContext } from "@/widgets/profileCard/lib/profileCardContext";
import { motion, Variants } from "motion/react";
import { RefObject, useRef } from "react";

// undefined - never toggled, plays the intro
const getCardState = (isFullScreen: boolean | undefined) => {
  if (isFullScreen === undefined) return "end";
  return isFullScreen ? "fullscreen" : "endFast";
};

interface IProps {
  children: React.ReactNode;
  order: CardOrder;
  variants: Variants;
  className: string;
  noFullScreen?: boolean;
}

// fixed size board: hover tilt and fullscreen zoom
export const DesktopProfileCard: React.FC<IProps> = ({
  children,
  order,
  variants,
  className,
  noFullScreen,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { z, rotateX, rotateY, onCardMouseLeave, onCardMouseMove, onCardClick, isFullScreen } =
    useProfileCardAnimations(cardRef as RefObject<HTMLDivElement>, order, !noFullScreen);

  const gridStyle = getCardGridStyle(order);
  const cursorClass = noFullScreen ? "" : "cursor-pointer";

  return (
    <motion.div
      ref={cardRef}
      style={{ z, rotateX, rotateY, ...gridStyle }}
      onMouseLeave={onCardMouseLeave}
      onMouseMove={onCardMouseMove}
      onClick={onCardClick}
      className={`absolute w-full h-full overflow-hidden border-5 border-ink hover:shadow-[9px_9px_0_var(--color-ink)] transition-shadow ${cursorClass} ${className}`}
      variants={variants}
      // card is its own variant root, so its content always gets fullscreen / endFast states
      initial="start"
      animate={getCardState(isFullScreen)}
    >
      <ProfileCardContext value={{ isFullScreen: isFullScreen === true, isMobile: false }}>
        {children}
      </ProfileCardContext>
    </motion.div>
  );
};
