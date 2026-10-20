import { IStackCategory } from "@/entities/portfolio";
import {
  arsenalColumnVariants,
  arsenalVariants,
} from "@/pagess/mainPage/components/profileCards/stack/animations";
import { ArsenalColumn } from "@/pagess/mainPage/components/profileCards/stack/ArsenalColumn";
import { Caption } from "@/shared/comic";
import { motion } from "motion/react";

interface IProps {
  categories: IStackCategory[];
  activeId: number;
}

// up to 4 columns fit the fullscreen card, more scroll sideways
const MAX_FITTING_COLUMNS = 4;

// fullscreen card: every category side by side, compact skill rows
export const StackArsenal: React.FC<IProps> = ({ categories, activeId }) => {
  const skillsCount = categories.reduce((sum, { items }) => sum + items.length, 0);
  const columnMin = categories.length > MAX_FITTING_COLUMNS ? "210px" : "0";

  return (
    <motion.div
      variants={arsenalVariants}
      initial="start"
      animate="end"
      exit="exit"
      className="absolute inset-0 flex flex-col gap-4 p-6"
    >
      <div className="flex justify-between items-end gap-4">
        <p className="font-bangers text-[44px] leading-none">
          CHAPTER 3: <span className="text-comic-blue">THE ARSENAL</span>
        </p>
        <Caption>
          {skillsCount} skills · {categories.length} categories
        </Caption>
      </div>
      <div
        style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(${columnMin}, 1fr))` }}
        className="gap-4 grid pr-1.5 pb-1.5 min-h-0 overflow-x-auto grow"
      >
        {categories.map((category) => (
          <ArsenalColumn
            key={category.id}
            category={category}
            isActive={category.id === activeId}
            variants={arsenalColumnVariants}
            isScrollable
          />
        ))}
      </div>
    </motion.div>
  );
};
