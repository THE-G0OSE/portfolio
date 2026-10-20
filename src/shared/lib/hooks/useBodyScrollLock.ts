import { useEffect } from "react";

// stops the page under an overlay from scrolling
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";

    return () => {
      style.overflow = previous;
    };
  }, [isLocked]);
};
