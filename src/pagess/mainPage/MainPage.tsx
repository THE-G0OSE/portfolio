import { IPortfolio } from "@/entities/portfolio";
import { ProfileSection } from "@/pagess/mainPage/components/ProfileSection";
import { Caption } from "@/shared/comic";

interface IProps {
  portfolio: IPortfolio | null;
}

export const MainPage: React.FC<IProps> = ({ portfolio }) => {
  return (
    <div className="paper min-h-screen overflow-x-clip" >
      {portfolio ? (
        <ProfileSection portfolio={portfolio} />
      ) : (
        <div className="flex justify-center items-center p-4 min-h-screen">
          <Caption>The presses are down… come back in a minute!</Caption>
        </div>
      )}
    </div>
  );
};
