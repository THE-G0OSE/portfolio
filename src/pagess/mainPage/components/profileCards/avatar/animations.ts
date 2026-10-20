import { createCardVariants, createContentVariants, ICardVariants } from "@/widgets/profileCard";
import { stagger, Transition, Variants } from "motion";

// every element has 4 states: start/end - intro of the normal card,
// endFast/fullscreen - same timing as the card itself, so they move together
const CARD_TRANSITION: Transition = { duration: 1, ease: "easeOut" };

export const avatarVariants: ICardVariants = createCardVariants(
  0,
  { y: 20, opacity: 0, scale: 0.7 },
  { duration: 3, ease: "anticipate" },
);

// PORTRAIT: 64% of the card, narrower column in fullscreen

const IMAGE_NORMAL = { x: 0, rotateZ: 0, width: "64%" };

export const avatarImageVariants: Variants = {
  start: { x: "-110%", rotateZ: -12, width: "64%" },
  end: { ...IMAGE_NORMAL, transition: { type: "spring", stiffness: 60, delay: 2.5 } },
  endFast: { ...IMAGE_NORMAL, transition: CARD_TRANSITION },
  fullscreen: { ...IMAGE_NORMAL, width: "40%", transition: CARD_TRANSITION },
};

// SPEECH BUBBLE: top right in normal card, grows over the portrait in fullscreen.
// width in % keeps it inside narrow phone cards

const BUBBLE_NORMAL = { left: "47%", top: "6%", width: "49%", height: 104, fontSize: "16px", scale: 1, rotate: 0 };

export const bubbleVariants: Variants = {
  start: { ...BUBBLE_NORMAL, scale: 0, rotate: -20 },
  end: { ...BUBBLE_NORMAL, transition: { type: "spring", stiffness: 260, damping: 12, delay: 3.2 } },
  endFast: { ...BUBBLE_NORMAL, transition: CARD_TRANSITION },
  fullscreen: {
    left: "3%",
    top: "62%",
    width: "34%",
    height: 180,
    fontSize: "19px",
    scale: 1,
    rotate: -3,
    transition: CARD_TRANSITION,
  },
};

// tagline unfolds inside the bubble only in fullscreen
const TAGLINE_HIDDEN = { height: 0, opacity: 0 };

export const taglineVariants: Variants = {
  start: TAGLINE_HIDDEN,
  end: TAGLINE_HIDDEN,
  endFast: { ...TAGLINE_HIDDEN, transition: { duration: 0.2 } },
  fullscreen: { height: "auto", opacity: 1, transition: { delay: 0.5, duration: 0.4 } },
};

// ROLE BADGES: bottom right in normal card, top right corner in fullscreen

const ROLES_NORMAL = { right: "2%", bottom: "16.5%", rotate: -12, scale: 1 };

export const rolesVariants: Variants = {
  start: ROLES_NORMAL,
  end: { ...ROLES_NORMAL, transition: { delayChildren: stagger(0.3, { startDelay: 3 }) } },
  endFast: { ...ROLES_NORMAL, transition: CARD_TRANSITION },
  fullscreen: { right: "3%", bottom: "83%", rotate: -4, scale: 0.8, transition: CARD_TRANSITION },
};

export const roleVariants: Variants = createContentVariants({
  start: { x: 260, opacity: 0 },
  end: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
});

// "Based in" caption: dossier shows location in fullscreen
export const basedInVariants: Variants = {
  start: { opacity: 1 },
  end: { opacity: 1 },
  endFast: { opacity: 1, transition: { delay: 0.5, duration: 0.3 } },
  fullscreen: { opacity: 0, transition: { duration: 0.2 } },
};

// DOSSIER: extra info, hidden in normal card

const DOSSIER_HIDDEN = { opacity: 0, x: 40 };

export const dossierVariants: Variants = {
  start: DOSSIER_HIDDEN,
  end: DOSSIER_HIDDEN,
  endFast: { ...DOSSIER_HIDDEN, transition: { duration: 0.2 } },
  fullscreen: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.35, duration: 0.45, ease: "easeOut", delayChildren: stagger(0.08, { startDelay: 0.45 }) },
  },
};

const DOSSIER_ITEM_HIDDEN = { opacity: 0, y: 16 };

export const dossierItemVariants: Variants = {
  start: DOSSIER_ITEM_HIDDEN,
  end: DOSSIER_ITEM_HIDDEN,
  endFast: { ...DOSSIER_ITEM_HIDDEN, transition: { duration: 0.15 } },
  fullscreen: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};
