import {
  CardOrder,
  getDistanceToRectangle,
  getRotationPercent,
} from "@/widgets/profileCard/lib/helpers";
import { CAN_HOVER_QUERY } from "@/shared/config";
import { useMediaQuery } from "@/shared/lib";
import { fullScreenCard as fullScreenCardAtom } from "@/widgets/profileCard/model/profileCardState";
import { useAtom } from "@reatom/react";
import { useMotionValue, useSpring } from "motion/react";
import {
  RefObject,
  useCallback,
  useLayoutEffect,
  MouseEvent as ReactMouseEvent,
  useState,
} from "react";

const MAX_DISTANCE = 300;
const MAX_ROTATION = 3;
const FULLSCREEN_Z = 100;

// lift grows from 0 at MAX_DISTANCE to ~11px when cursor touches the card.
// +1 keeps log argument >= 1: log(0) = -Infinity turned spring into NaN forever
const getLift = (distance: number) => Math.log(MAX_DISTANCE - distance + 1) * 2;

export const useProfileCardAnimations = (
  cardRef: RefObject<HTMLDivElement>,
  order: CardOrder,
  canFullScreen: boolean,
) => {
  const zRaw = useMotionValue(0);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const z = useSpring(zRaw, {damping: 50});
  const rotateX = useSpring(rotateXRaw);
  const rotateY = useSpring(rotateYRaw);
  const [fullScreenCard, setFullScreenCard] = useAtom(fullScreenCardAtom);
  // touch screens fire mousemove on tap and never mouseleave, the card would stay tilted
  const canHover = useMediaQuery(CAN_HOVER_QUERY);
  // undefined until first toggle, so card keeps inheriting intro animation from the grid
  const [wasToggled, setWasToggled] = useState(false);

  const isOpen = fullScreenCard === order;
  const isFullScreen = wasToggled ? isOpen : undefined;

  const onDocumentMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current && canHover && !isOpen) {
        const distance = getDistanceToRectangle(e, cardRef.current);
        if (distance < MAX_DISTANCE) {
          zRaw.set(getLift(distance));
        } else {
          if (zRaw.get() !== 0) zRaw.set(0);
        }
      }
    },
    [cardRef, zRaw, canHover, isOpen],
  );

  const onCardMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      if (cardRef.current && canHover && !isOpen) {
        const { x, y } = getRotationPercent(e, cardRef.current);

        rotateXRaw.set(x * MAX_ROTATION);
        rotateYRaw.set(y * MAX_ROTATION);
      }
    },
    [cardRef, rotateXRaw, rotateYRaw, canHover, isOpen],
  );

  const onCardMouseLeave = useCallback(() => {
    if (cardRef.current) {
      rotateXRaw.set(0);
      rotateYRaw.set(0);
    }
  }, [cardRef, rotateXRaw, rotateYRaw]);

  const onCardClick = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (!canFullScreen) return;
    // only one card can be open at a time
    if (fullScreenCard !== null && !isOpen) return;

    setWasToggled(true);
    setFullScreenCard(isOpen ? null : order);
    if (!isOpen) {
      zRaw.set(FULLSCREEN_Z);
      rotateXRaw.set(0);
      rotateYRaw.set(0);
    } else {
      zRaw.set(0);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("mousemove", onDocumentMouseMove);
    return () => window.removeEventListener("mousemove", onDocumentMouseMove);
  }, [onDocumentMouseMove]);

  return {
    z,
    rotateX,
    rotateY,
    onCardMouseMove,
    onCardMouseLeave,
    onCardClick,
    isFullScreen,
  };
};
