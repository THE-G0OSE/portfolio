import { IStackCategory } from "@/entities/portfolio";
import { stackVariants } from "@/pagess/mainPage/components/profileCards/stack/animations";
import { StackArsenal } from "@/pagess/mainPage/components/profileCards/stack/StackArsenal";
import { StackCategoryView } from "@/pagess/mainPage/components/profileCards/stack/StackCategoryView";
import { StackSheet } from "@/pagess/mainPage/components/profileCards/stack/StackSheet";
import { stackCategory } from "@/pagess/mainPage/model/mainPageState";
import { Caption } from "@/shared/comic";
import { ProfileCard, useProfileCard } from "@/widgets/profileCard";
import { useAtom } from "@reatom/react";
import { AnimatePresence } from "motion/react";

interface IProps {
  categories: IStackCategory[];
}

// rendered inside ProfileCard, so it can read the fullscreen state
const StackContent: React.FC<IProps> = ({ categories }) => {
  const [category] = useAtom(stackCategory);
  const { isFullScreen } = useProfileCard();
  const active = categories.find(({ id }) => id === category) ?? categories[0];

  if (!active) return <Caption className="top-3 left-3 absolute">The stack is empty</Caption>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isFullScreen ? (
        <StackArsenal key="arsenal" categories={categories} activeId={active.id} />
      ) : (
        <StackCategoryView key={active.id} category={active} />
      )}
    </AnimatePresence>
  );
};

export const StackCard: React.FC<IProps> = ({ categories }) => {
  return (
    <ProfileCard
      variants={stackVariants}
      order={3}
      className="speed-lines"
      sheet={<StackSheet categories={categories} />}
      sheetLabel="full stack"
    >
      <StackContent categories={categories} />
    </ProfileCard>
  );
};
