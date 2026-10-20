import { IStackCategory } from "@/entities/portfolio";
import { powerSwitchVariants } from "@/pagess/mainPage/components/profileCards/powerSwitch/animations";
import { stackCategory } from "@/pagess/mainPage/model/mainPageState";
import { ProfileCard } from "@/widgets/profileCard";
import { useAtom } from "@reatom/react";

interface IProps {
  categories: IStackCategory[];
}

export const PowerSwitchCard: React.FC<IProps> = ({ categories }) => {
  const [category, setCategory] = useAtom(stackCategory);
  const activeId = category ?? categories[0]?.id;

  return (
    <ProfileCard
      variants={powerSwitchVariants}
      order={2}
      className="flex flex-col gap-2 p-2.5 ht-ink"
      noFullScreen
    >
      <p className="font-bangers text-[19px] text-comic-yellow text-center leading-none">
        CHOOSE YOUR POWER! ►
      </p>
      <div role="tablist" aria-label="Stack category" className="gap-2 grid grid-cols-2 max-lg:grid-cols-[repeat(auto-fit,minmax(64px,1fr))] grow">
        {categories.map(({ id, label }) => {
          const selected = id === activeId;

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={(e) => {
                e.stopPropagation();
                setCategory(id);
              }}
              className={`min-h-12 border-3 border-ink font-bangers text-[21px] cursor-pointer transition ${
                selected
                  ? "bg-comic-red text-white translate-0.75"
                  : "bg-comic-yellow text-ink shadow-[3px_3px_0_var(--color-white)] hover:-translate-px"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </ProfileCard>
  );
};
