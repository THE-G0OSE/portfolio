import { useBodyScrollLock, useCloseOnBack, useIsClient } from "@/shared/lib";
import { sheetVariants } from "@/widgets/profileCard/lib/animations";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useEffectEvent, useRef } from "react";
import { createPortal } from "react-dom";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}

// phones: expanded card content as a full page over the site.
// Portal to body: transformed card ancestors would turn position: fixed into absolute
export const CardSheet: React.FC<IProps> = ({ isOpen, onClose, label, children }) => {
  const isClient = useIsClient();
  const backRef = useRef<HTMLButtonElement>(null);
  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  });

  useBodyScrollLock(isOpen);
  useCloseOnBack(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;

    // focus goes into the sheet and back to the opener on close
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    backRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => onKeyDown(e);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="sheet"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          variants={sheetVariants}
          initial="start"
          animate="end"
          exit="exit"
          className="z-50 fixed inset-0 overflow-y-auto overscroll-contain paper"
        >
          <div className="top-0 z-10 sticky bg-paper px-4 py-3 border-ink border-b-4">
            <button
              ref={backRef}
              type="button"
              onClick={onClose}
              className="bg-ink shadow-[4px_4px_0_var(--color-comic-red)] active:shadow-none px-4.5 py-2 border-3 border-ink min-h-12 font-bangers text-[22px] text-comic-yellow active:translate-1 transition-transform cursor-pointer"
            >
              ◄ BACK
            </button>
          </div>
          <div className="mx-auto px-4 pt-5 pb-12 max-w-160">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
