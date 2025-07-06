import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { projects } from "../app/projects/data";

interface ProjectSidebarProps {
  activeId: string;
  onSelect: (slug: string) => void;
}

export function ProjectSidebar({ activeId, onSelect }: ProjectSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <aside
      ref={sidebarRef}
      className="sticky top-0  overflow-y-auto bg-[var(--color-6)] border-0 border-[var(--color-3)] px-10 py-10 w-full max-w-xs min-w-[220px] flex flex-col gap-2"
    >
        <div className="flex-row flex gap-2" >  
            <Link
                href="/"
                className="mt-4 inline-block text-[var(--color-1)] hover:text-[var(--color-0)] font-semibold text-lg transition-colors duration-200"
                aria-label="Back to home"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline align-middle"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </Link>
            <h2 className="text-6xl font-bold mb-6 text-[var(--color-1)] tracking-tight">
                Projects
            </h2>
        </div>
      <nav className="flex flex-col gap-2">
        {projects.map((project) => (
          <button
            key={project.slug}
            onClick={() => onSelect(project.slug)}
            className={clsx(
              "text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium text-[var(--color-1)] hover:text-[var(--color-0)]",
              activeId === project.slug &&
                "bg-[var(--color-0)] text-[var(--color-5)] shadow-[0_4px_24px_0_var(--color-1)] hover:text-[var(--color-5)]"
            )}
            style={{ outline: "none" }}
          >
            {project.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}
