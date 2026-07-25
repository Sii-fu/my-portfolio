import Link from "next/link";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getAllProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

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
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
