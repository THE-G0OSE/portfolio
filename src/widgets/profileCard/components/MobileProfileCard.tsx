import { CardSheet } from "@/widgets/profileCard/components/CardSheet";
import { moreTagVariants } from "@/widgets/profileCard/lib/animations";
import { CardOrder } from "@/widgets/profileCard/lib/helpers";
import { ProfileCardContext } from "@/widgets/profileCard/lib/profileCardContext";
import { fullScreenCard as fullScreenCardAtom } from "@/widgets/profileCard/model/profileCardState";
import { useAtom } from "@reatom/react";
import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";

interface IProps {
  children: React.ReactNode;
  order: CardOrder;
  variants: Variants;
  className: string;
  height?: number;
  sheet?: React.ReactNode;
  sheetLabel: string;
}

const MOBILE_CONTEXT = { isFullScreen: false, isMobile: true };

// phones: card in the page flow, tap opens its expanded content in a full page sheet
export const MobileProfileCard: React.FC<IProps> = ({
  children,
  order,
  variants,
  className,
  height,
  sheet,
  sheetLabel,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // intro starts when the card scrolls into view, not on page load
  const isInView = useInView(wrapperRef, { once: true, margin: "0px 0px -15% 0px" });
  const [openCard, setOpenCard] = useAtom(fullScreenCardAtom);

  const canOpen = sheet !== undefined;
  const state = isInView ? "end" : "start";

  const open = () => {
    // only one card can be open at a time
    if (openCard === null) setOpenCard(order);
  };
  const close = () => setOpenCard(null);

  return (
    <div ref={wrapperRef} className="relative">
      <motion.div
        onClick={canOpen ? open : undefined}
        whileTap={canOpen ? { scale: 0.98 } : undefined}
        style={{ height }}
        className={`relative w-full min-h-30 overflow-hidden border-5 border-ink ${canOpen ? "cursor-pointer" : ""} ${className}`}
        variants={variants}
        // card is the variant root of its content, like on desktop
        initial="start"
        animate={state}
      >
        <ProfileCardContext value={MOBILE_CONTEXT}>{children}</ProfileCardContext>
      </motion.div>
      {canOpen && (
        <>
          {/* touch screens have no hover or cursor, the sticker shows the card opens */}
          <motion.button
            type="button"
            onClick={open}
            aria-haspopup="dialog"
            aria-label={`Open ${sheetLabel}`}
            variants={moreTagVariants}
            initial="start"
            animate={state}
            className="-bottom-4.5 right-3 z-10 absolute bg-comic-yellow shadow-[3px_3px_0_var(--color-ink)] active:shadow-none px-3 border-3 border-ink min-h-9 font-bangers text-ink text-lg cursor-pointer"
          >
            MORE ►
          </motion.button>
          <CardSheet isOpen={openCard === order} onClose={close} label={sheetLabel}>
            {sheet}
          </CardSheet>
        </>
      )}
    </div>
  );
};
