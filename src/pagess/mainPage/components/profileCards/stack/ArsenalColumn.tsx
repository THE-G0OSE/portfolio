import { IStackCategory } from "@/entities/portfolio";
import { Burst, comicFillClass, comicPipClass, LevelPips } from "@/shared/comic";
import { motion, Variants } from "motion/react";

interface IProps {
  category: IStackCategory;
  // picked in the power switch
  isActive: boolean;
  variants: Variants;
  // fullscreen card: fixed height column, skills scroll inside.
  // phone sheet: grows with its skills, the page scrolls
  isScrollable?: boolean;
}

// one stack category with compact skill rows
export const ArsenalColumn: React.FC<IProps> = ({ category, isActive, variants, isScrollable }) => {
  const { part, title, sfx, color, items } = category;

  return (
    <motion.section
      variants={variants}
      className={`flex flex-col gap-2.5 bg-white p-3 border-4 border-ink ${isScrollable ? "min-h-0" : ""} ${
        isActive ? "shadow-[6px_6px_0_var(--color-comic-red)]" : "shadow-[6px_6px_0_var(--color-ink)]"
      }`}
    >
      <header className="flex items-center gap-2.5">
        <Burst size={56} outline={4} fillClassName={comicFillClass[color]} className="text-xl shrink-0">
          {part}
        </Burst>
        <div className="min-w-0">
          <p className="font-bangers text-lg leading-none">{title}</p>
          <p className="font-bold text-[11px] uppercase">
            {items.length} skills · {sfx}
          </p>
        </div>
      </header>
      <ul
        className={
          isScrollable
            ? "flex flex-col gap-1.5 pr-1 min-h-0 grow comic-scroll"
            : "gap-1.5 grid grid-cols-1 sm:grid-cols-2"
        }
      >
        {items.map(({ id, name, level }) => (
          <li key={id} className="flex justify-between items-center gap-2 px-2 py-1 border-2 border-ink shrink-0">
            <span className="min-w-0 font-mono font-bold text-[13px] break-words leading-tight">{name}</span>
            <LevelPips compact level={level} activeClassName={comicPipClass[color]} label={`${name}: level ${level} of 5`} />
          </li>
        ))}
      </ul>
    </motion.section>
  );
};
