import { useEffect, useEffectEvent } from "react";

const HISTORY_KEY = "closeOnBack";

// while active, browser / phone "back" closes the overlay instead of leaving the page.
// Next.js copies its router state into the pushed entry, so going back stays on this page
export const useCloseOnBack = (isActive: boolean, onClose: () => void) => {
  const handleBack = useEffectEvent(onClose);

  useEffect(() => {
    if (!isActive) return;

    window.history.pushState({ [HISTORY_KEY]: true }, "");
    const onPopState = () => handleBack();
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
      // closed from the page (button, escape): drop the entry pushed on open
      if (window.history.state?.[HISTORY_KEY]) window.history.back();
    };
  }, [isActive]);
};
