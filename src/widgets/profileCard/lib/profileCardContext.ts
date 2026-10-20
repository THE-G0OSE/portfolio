import { createContext, useContext } from "react";

interface IProfileCardContext {
  isFullScreen: boolean;
  // phone layout: no fullscreen zoom, expanded content opens in a sheet instead
  isMobile: boolean;
}

export const ProfileCardContext = createContext<IProfileCardContext>({
  isFullScreen: false,
  isMobile: false,
});

// lets card content switch its layout in fullscreen / on phones
export const useProfileCard = () => useContext(ProfileCardContext);
