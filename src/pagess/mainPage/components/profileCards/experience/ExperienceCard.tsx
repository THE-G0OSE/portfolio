import { IJob, IProject } from "@/entities/portfolio";
import { experienceVariants } from "@/pagess/mainPage/components/profileCards/experience/animations";
import { ExperienceSheet } from "@/pagess/mainPage/components/profileCards/experience/ExperienceSheet";
import { Caption, comicFillClass, comicHalftoneClass } from "@/shared/comic";
import { ProfileCard } from "@/widgets/profileCard";

interface IProps {
  jobs: IJob[];
  projects: IProject[];
}

// card has room for 3 jobs and 2 projects, the rest goes to fullscreen later
const MAX_JOBS = 3;
const MAX_PROJECTS = 2;

export const ExperienceCard: React.FC<IProps> = ({ jobs, projects }) => {
  return (
    <ProfileCard
      variants={experienceVariants}
      order={4}
      // phones: one column, jobs above projects
      className="gap-1.25 grid grid-cols-[5fr_6fr] max-lg:grid-cols-1 grid-rows-[auto_minmax(0,1fr)] max-lg:grid-rows-none bg-ink"
      sheet={<ExperienceSheet jobs={jobs} projects={projects} />}
      sheetLabel="experience and projects"
    >
      <div className="flex flex-wrap justify-between items-center gap-x-3 col-span-full bg-comic-yellow px-3.5 py-1.5 font-bangers text-[28px] max-lg:text-[22px]">
        <span>PREVIOUSLY ON THE GOOSE…</span>
        <span className="font-comic font-bold text-[13px]">experience &amp; recent projects</span>
      </div>
      <div className="gap-1.25 grid grid-rows-3">
        {jobs.slice(0, MAX_JOBS).map(({ id, period, role, company, impact, color }, i) => (
          <div key={id} className={`flex flex-col justify-center gap-1 px-3 py-2.5 ${i % 2 ? "bg-white" : "paper"}`}>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className={`px-1.75 py-0.5 border-3 border-ink font-bangers text-[17px] ${comicFillClass[color]}`}>
                {period}
              </span>
              <span className="font-bangers text-xl">{role}</span>
            </div>
            <p className="font-bold text-sm">
              @ {company} — {impact}
            </p>
          </div>
        ))}
      </div>
      <div className="gap-1.25 grid grid-rows-2">
        {projects.slice(0, MAX_PROJECTS).map(({ id, tag, name, description, tech, color }) => (
          <article
            key={id}
            className="grid grid-cols-[140px_minmax(0,1fr)] max-lg:grid-cols-[96px_minmax(0,1fr)] bg-white"
          >
            <div className={`flex justify-center items-center border-ink border-r-5 ${comicHalftoneClass[color]}`}>
              <Caption white className="max-lg:px-1.5 max-lg:text-[10px]">[Screenshot]</Caption>
            </div>
            <div className="flex flex-col justify-center gap-1.25 px-3 py-2.5">
              <span className="self-start bg-ink px-1.5 py-0.5 font-bold text-[11px] text-comic-yellow uppercase">
                {tag}
              </span>
              <p className="font-bangers text-2xl leading-none">{name}</p>
              <p className="font-bold text-[13px] leading-[1.3]">{description}</p>
              <p className="font-mono font-bold text-[11px]">{tech.join(" · ")}</p>
            </div>
          </article>
        ))}
      </div>
    </ProfileCard>
  );
};
