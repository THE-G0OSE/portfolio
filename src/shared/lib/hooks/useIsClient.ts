import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// true only in the browser, e.g. before using document in a portal
export const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
