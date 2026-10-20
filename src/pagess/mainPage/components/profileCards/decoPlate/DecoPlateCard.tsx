import { decoPlateVariants } from "@/pagess/mainPage/components/profileCards/decoPlate/animations";
import { Caption } from "@/shared/comic";
import { ProfileCard } from "@/widgets/profileCard";

export const DecoPlateCard = () => {
  return (
    <ProfileCard variants={decoPlateVariants} order={6} className="ht-blue" mobileHeight={200} noFullScreen>
      {/* illustration TBD */}
      <Caption className="bottom-2.5 left-2.5 z-3 absolute">Meanwhile, high above the codebase…</Caption>
    </ProfileCard>
  );
};
