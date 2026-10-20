import { MOBILE_QUERY } from "@/shared/config";
import { useMediaQuery } from "@/shared/lib";
import { DesktopProfileCard } from "@/widgets/profileCard/components/DesktopProfileCard";
import { MobileProfileCard } from "@/widgets/profileCard/components/MobileProfileCard";
import { CardOrder, ICardVariants } from "@/widgets/profileCard/lib/helpers";

interface IProps {
  children: React.ReactNode;
  order: CardOrder;
  variants: ICardVariants;
  className?: string;
  noFullScreen?: boolean;
  // phones: fixed card height, content defines it when omitted
  mobileHeight?: number;
  // phones: expanded content, opens as a full page sheet instead of the fullscreen zoom
  sheet?: React.ReactNode;
  sheetLabel?: string;
}

export const ProfileCard: React.FC<IProps> = ({
  children,
  order,
  variants,
  className = "bg-white",
  noFullScreen,
  mobileHeight,
  sheet,
  sheetLabel = "card details",
}) => {
  const isMobile = useMediaQuery(MOBILE_QUERY);

  if (isMobile) {
    return (
      <MobileProfileCard
        order={order}
        variants={variants.mobile}
        className={className}
        height={mobileHeight}
        sheet={noFullScreen ? undefined : sheet}
        sheetLabel={sheetLabel}
      >
        {children}
      </MobileProfileCard>
    );
  }

  return (
    <DesktopProfileCard
      order={order}
      variants={variants.desktop}
      className={className}
      noFullScreen={noFullScreen}
    >
      {children}
    </DesktopProfileCard>
  );
};
