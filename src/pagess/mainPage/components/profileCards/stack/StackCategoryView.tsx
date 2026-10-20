import { IStackCategory } from "@/entities/portfolio";
import {
  stackItemVariants,
  stackPageVariants,
} from "@/pagess/mainPage/components/profileCards/stack/animations";
import { Burst, Caption, comicFillClass, comicPipClass, LevelPips } from "@/shared/comic";
import { motion } from "motion/react";

interface IProps {
  category: IStackCategory;
}

// normal card: one category picked in the power switch, skills scroll
export const StackCategoryView: React.FC<IProps> = ({ category }) => {
  const { part, sfx, title, color, items } = category;

  return (
    <motion.div
      variants={stackPageVariants}
      initial="start"
      animate="end"
      exit="exit"
      // phones: in the page flow, card grows with the skills
      className="max-lg:relative absolute inset-0 flex flex-col items-stretch gap-2.5 p-3"
    >
      <Caption className="self-start">The stack · part {part}</Caption>
      <Burst
        points={16}
        size={150}
        fillClassName={comicFillClass[color]}
        className="self-center text-[36px] [-webkit-text-stroke:1.2px_var(--color-ink)] shrink-0"
      >
        {sfx}
      </Burst>
      <p className="bg-ink px-1.5 py-1 font-bangers text-[24px] text-comic-yellow text-center leading-none">
        {title}
      </p>
      <div className="flex max-lg:grid max-lg:grid-cols-2 flex-col justify-center-safe gap-2 -mr-1.5 max-lg:mr-0 pr-1.5 max-lg:pr-0 pb-1 min-h-0 max-lg:overflow-y-visible grow comic-scroll">
        {items.map(({ id, name, level }) => (
          <motion.div
            key={id}
            variants={stackItemVariants}
            className="flex flex-col gap-1 bg-white shadow-[3px_3px_0_var(--color-ink)] px-2 py-1.5 border-3 border-ink shrink-0"
          >
            <span className="font-mono font-bold text-[13px] truncate">{name}</span>
            <LevelPips level={level} activeClassName={comicPipClass[color]} label={`${name}: level ${level} of 5`} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
