"use client";

import { EMPTY_PROFILE, fetchPortfolio, IPortfolio } from "@/entities/portfolio";
import { adminSession, LogoutButton } from "@/features/auth";
import { JobsEditor } from "@/features/editJobs";
import { ProfileEditor } from "@/features/editProfile";
import { ProjectsEditor } from "@/features/editProjects";
import { SocialsEditor } from "@/features/editSocials";
import { StackEditor } from "@/features/editStack";
import { ApiError } from "@/shared/api";
import { Caption } from "@/shared/comic";
import { useCallback, useEffect, useState } from "react";

const TABS = [
  { id: "profile", label: "PROFILE" },
  { id: "stack", label: "STACK" },
  { id: "jobs", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "socials", label: "SOCIALS" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export const AdminDashboard = () => {
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("profile");

  const reload = useCallback(() => {
    fetchPortfolio()
      .then((data) => {
        setPortfolio(data);
        setError(null);
      })
      .catch((err: unknown) => {
        // cookie expired, back to login
        if (err instanceof ApiError && err.status === 401) adminSession.set("guest");
        else setError(err instanceof Error ? err.message : "Failed to load data");
      });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const renderTab = () => {
    if (!portfolio) return null;

    switch (tab) {
      case "profile":
        return <ProfileEditor profile={portfolio.profile ?? EMPTY_PROFILE} onChange={reload} />;
      case "stack":
        return <StackEditor categories={portfolio.stack} onChange={reload} />;
      case "jobs":
        return <JobsEditor jobs={portfolio.jobs} onChange={reload} />;
      case "projects":
        return <ProjectsEditor projects={portfolio.projects} onChange={reload} />;
      case "socials":
        return <SocialsEditor socials={portfolio.socials} onChange={reload} />;
    }
  };

  return (
    <div className="flex flex-col gap-6 mx-auto px-4 py-8 w-full max-w-5xl">
      <header className="flex flex-wrap justify-between items-end gap-4 pb-3 border-ink border-b-5">
        <h1 className="font-bangers text-5xl leading-none">EDITOR&apos;S DESK</h1>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="font-bold underline">
            View site ↗
          </a>
          <LogoutButton />
        </div>
      </header>

      <nav role="tablist" aria-label="Sections" className="flex flex-wrap gap-2">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`px-4 border-3 border-ink min-h-11 font-bangers text-xl cursor-pointer ${
              tab === id ? "bg-comic-red text-white" : "bg-comic-yellow shadow-[3px_3px_0_var(--color-ink)]"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {error && (
        <p role="alert" className="font-bold text-comic-red">
          {error}
        </p>
      )}
      {!portfolio && !error && <Caption>Loading…</Caption>}

      <section role="tabpanel">{renderTab()}</section>
    </div>
  );
};
