"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProjectRecord } from "@/lib/projects";

type ProjectsGridProps = {
  projects: ProjectRecord[];
};

const filters = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "web-ai", label: "AI & Full-Stack" },
  { id: "iot", label: "IoT & Systems" },
  { id: "desktop", label: "Desktop & Secondary" },
] as const;

type ProjectFilter = (typeof filters)[number]["id"];

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              activeFilter === filter.id
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <article
            key={project.slug}
            className="group relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/20"
          >
            {/* Absolute overlay link to make whole card clickable, without nesting other links inside an anchor */}
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 z-0 rounded-2xl"
              aria-label={`View details for ${project.title}`}
            />

            <div className="relative z-10 pointer-events-none flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  {project.badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{project.short}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={`${project.slug}-${tech}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4 pointer-events-auto">
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-white/80">
                  {project.links?.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-white relative z-20">
                      GitHub ↗
                    </a>
                  )}
                  {project.links?.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="transition-colors hover:text-white relative z-20">
                      Live Demo ↗
                    </a>
                  )}
                  {project.links?.appStore && (
                    <a href={project.links.appStore} target="_blank" rel="noreferrer" className="transition-colors hover:text-white relative z-20">
                      App Store ↗
                    </a>
                  )}
                  {project.links?.playStore && (
                    <a href={project.links.playStore} target="_blank" rel="noreferrer" className="transition-colors hover:text-white relative z-20">
                      Play Store ↗
                    </a>
                  )}
                  {project.links?.figma && (
                    <a href={project.links.figma} target="_blank" rel="noreferrer" className="transition-colors hover:text-white relative z-20">
                      Figma ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}