import { RefObject, useEffect, useState } from "react";

// content width of the element, null until the first measure
export const useElementWidth = (ref: RefObject<HTMLElement | null>) => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // also fires right after observe(), so no separate first measure is needed
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return width;
};
