"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects as projectData } from "./data";

type ProjectCategory = "mobile" | "web-ai" | "iot" | "desktop";

type Project = {
  slug: string; // 1. Added slug to type definition
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  badge: "Production" | "Internship" | "Academic";
  github?: string;
  live?: string;
  appStore?: string;
  playStore?: string;
  figma?: string;
};

const projects: Project[] = projectData.map((project) => ({
  slug: project.slug, // 2. Map the slug from data.ts
  title: project.title,
  description: project.short || project.description,
  tech: project.tech,
  category: project.category === "other" ? "desktop" : project.category,
  badge: project.badge,
  github: project.links?.github,
  live: project.links?.live,
  appStore: project.links?.appStore,
  playStore: project.links?.playStore,
  figma: project.links?.figma,
}));

const filters = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "web-ai", label: "AI & Full-Stack" },
  { id: "iot", label: "IoT & Systems" },
  { id: "desktop", label: "Desktop & Secondary" },
] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[var(--color-6)] px-4 py-12 text-light sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            ← Go Back
          </Link>
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
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            // 3. Wrapped the entire article inside a Next.js Link component pointing to /[slug]
            <Link 
              href={`/projects/${project.slug}`} 
              key={project.slug}
              className="block h-full group text-inherit no-underline hover:no-underline"
            >
              <article
                className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    {project.badge}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{project.description}</p>
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
                {/* 4. Added onClick stopping propagation so clicking links doesn't navigate to details page */}
                <div 
                  className="mt-auto flex flex-wrap gap-3 text-sm font-semibold text-white/80 relative z-10"
                  onClick={(e) => e.stopPropagation()} 
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.appStore && (
                    <a
                      href={project.appStore}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      App Store ↗
                    </a>
                  )}
                  {project.playStore && (
                    <a
                      href={project.playStore}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      Play Store ↗
                    </a>
                  )}
                  {project.figma && (
                    <a
                      href={project.figma}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      Figma ↗
                    </a>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
