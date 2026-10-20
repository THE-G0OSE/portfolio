import { IStackCategory } from "@/entities/portfolio";
import { ArsenalColumn } from "@/pagess/mainPage/components/profileCards/stack/ArsenalColumn";
import { stackCategory } from "@/pagess/mainPage/model/mainPageState";
import { Caption } from "@/shared/comic";
import { sheetItemVariants } from "@/widgets/profileCard";
import { useAtom } from "@reatom/react";
import { motion } from "motion/react";

interface IProps {
  categories: IStackCategory[];
}

// phones: every category one under another
export const StackSheet: React.FC<IProps> = ({ categories }) => {
  const [category] = useAtom(stackCategory);
  const activeId = category ?? categories[0]?.id;
  const skillsCount = categories.reduce((sum, { items }) => sum + items.length, 0);

  return (
    <div className="flex flex-col gap-5">
      <motion.div variants={sheetItemVariants} className="flex flex-col items-start gap-2">
        <h2 className="font-bangers text-[44px] leading-none">
          CHAPTER 3: <span className="text-comic-blue">THE ARSENAL</span>
        </h2>
        <Caption>
          {skillsCount} skills · {categories.length} categories
        </Caption>
      </motion.div>
      {categories.map((item) => (
        <ArsenalColumn key={item.id} category={item} isActive={item.id === activeId} variants={sheetItemVariants} />
      ))}
    </div>
  );
};
