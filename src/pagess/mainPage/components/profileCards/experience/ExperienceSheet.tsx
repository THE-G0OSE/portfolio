import { IJob, IProject } from "@/entities/portfolio";
import { Caption, comicFillClass, comicHalftoneClass } from "@/shared/comic";
import { sheetItemVariants } from "@/widgets/profileCard";
import { motion } from "motion/react";

interface IProps {
  jobs: IJob[];
  projects: IProject[];
}

const LINK_CLASS =
  "shadow-[3px_3px_0_var(--color-ink)] px-3.5 py-1.5 border-3 border-ink font-bangers text-lg no-underline active:translate-0.5";

// phones: every job and project, the card itself has room only for a few
export const ExperienceSheet: React.FC<IProps> = ({ jobs, projects }) => {
  return (
    <div className="flex flex-col gap-4">
      <motion.h2 variants={sheetItemVariants} className="font-bangers text-[44px] leading-none">
        CHAPTER 4: <span className="text-comic-red">THE ADVENTURES</span>
      </motion.h2>

      <motion.p variants={sheetItemVariants} className="mt-2 font-bangers text-[28px] leading-none">
        THE JOBS
      </motion.p>
      {jobs.map(({ id, period, role, company, impact, color }) => (
        <motion.article
          key={id}
          variants={sheetItemVariants}
          className="bg-white shadow-[5px_5px_0_var(--color-ink)] border-4 border-ink"
        >
          <p className={`px-4 py-1.5 border-ink border-b-4 font-bangers text-2xl ${comicFillClass[color]}`}>{period}</p>
          <div className="flex flex-col gap-1.5 px-4 py-3">
            <p className="font-bangers text-2xl leading-none">
              {role} @ {company}
            </p>
            <p className="font-bold text-base leading-snug">{impact}</p>
          </div>
        </motion.article>
      ))}

      <motion.p variants={sheetItemVariants} className="mt-2 font-bangers text-[28px] leading-none">
        THE PROJECTS
      </motion.p>
      {projects.map(({ id, tag, name, description, tech, color, liveUrl, codeUrl }) => (
        <motion.article
          key={id}
          variants={sheetItemVariants}
          className="flex flex-col bg-white shadow-[5px_5px_0_var(--color-ink)] border-4 border-ink"
        >
          <div className={`flex justify-center items-center border-ink border-b-4 h-36 ${comicHalftoneClass[color]}`}>
            <Caption white>[Screenshot]</Caption>
          </div>
          <div className="flex flex-col gap-2 px-4 py-3">
            <span className="self-start bg-ink px-1.5 py-0.5 font-bold text-[11px] text-comic-yellow uppercase">
              {tag}
            </span>
            <p className="font-bangers text-[26px] leading-none">{name}</p>
            <p className="font-bold text-[15px] leading-snug">{description}</p>
            <ul className="flex flex-wrap gap-1.5">
              {tech.map((item, i) => (
                <li key={i} className="bg-white px-2 py-0.5 border-2 border-ink font-mono font-bold text-xs">
                  {item}
                </li>
              ))}
            </ul>
            {(liveUrl || codeUrl) && (
              <div className="flex gap-2.5 mt-1">
                {liveUrl && (
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`bg-comic-yellow text-ink ${LINK_CLASS}`}>
                    LIVE ►
                  </a>
                )}
                {codeUrl && (
                  <a href={codeUrl} target="_blank" rel="noopener noreferrer" className={`bg-ink text-comic-yellow ${LINK_CLASS}`}>
                    CODE ►
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
};
