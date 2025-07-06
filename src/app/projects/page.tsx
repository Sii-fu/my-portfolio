"use client";

import { useRef, useState, useEffect } from "react";
import { projects } from "./data";
import { ProjectSidebar } from "../../components/ProjectSidebar";
import { ProjectDetailSection } from "../../components/ProjectDetailSection";

export default function ProjectsStickyGallery() {
  const [activeId, setActiveId] = useState(projects[0]?.slug || "");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scrollspy: update activeId as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      let current = projects[0]?.slug;
      for (let idx = 0; idx < projects.length; idx++) {
        const ref = sectionRefs.current[idx];
        if (ref && projects[idx]) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 120) {
            current = projects[idx].slug;
          }
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section on sidebar click
  const handleSelect = (slug: string) => {
    const idx = projects.findIndex((p) => p.slug === slug);
    const ref = sectionRefs.current[idx];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-6)] font-sans">
      <div className="  flex gap-8">
        {/* Sidebar */}
        <div className="w-1/4 min-w-[220px]">
          <ProjectSidebar activeId={activeId} onSelect={handleSelect} />
        </div>
        {/* Main content */}
        <div className="flex-1 w-3/4 border-l border-[var(--color-3)] pl-8">
          {projects.map((project, i) => (
            <section
              key={project.slug}
              id={project.slug}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
            >
              <ProjectDetailSection project={project} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
