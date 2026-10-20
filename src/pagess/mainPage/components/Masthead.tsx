import { IProfile } from "@/entities/portfolio";
import { Blink, Flex } from "@/shared/containers";

interface IProps {
  profile: IProfile;
}

export const Masthead: React.FC<IProps> = ({ profile }) => {
  return (
    <header className="flex max-lg:flex-col justify-between items-end max-lg:items-start gap-x-6 gap-y-4 pb-3.5 border-ink border-b-5">
      <Flex wrap gap={"10px 18px"} className="items-end">
        <div className="shadow-[4px_4px_0_var(--color-ink)] px-3 pt-1.5 pb-0.5 border-4 border-ink font-bangers text-[22px] max-sm:text-lg text-white text-nowrap -rotate-4 ht-red">
          THE GOOSE&apos;S
        </div>
        <Blink>
          <h1 className="pr-2.5 pb-2.5 font-bangers text-[clamp(52px,15vw,84px)] text-comic-yellow leading-[.86] [-webkit-text-stroke:3px_var(--color-ink)] [text-shadow:5px_5px_0_var(--color-ink),8px_8px_0_var(--color-comic-red)]">
            PORTFOLIO
          </h1>
        </Blink>
      </Flex>
      <div className="flex items-stretch bg-white border-4 border-ink">
        <div className="px-3.5 py-2 border-ink border-r-4 font-bold text-[13px] leading-[1.3] uppercase">
          Issue {profile.issue}
          <br />
          {profile.issueDate}
        </div>
        <div className="flex items-center bg-comic-yellow px-3.5 py-2 font-bangers text-[26px]">FREE!</div>
      </div>
    </header>
  );
};
