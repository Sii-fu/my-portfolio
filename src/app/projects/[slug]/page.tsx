import Image from "next/image";
import Link from "next/link";
import { projects } from "../data";

function renderMarkdown(text: string) {
  return text
    .trim()
    .split("\n\n")
    .map((block, index) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const isList = lines.every((line) => line.startsWith("-"));

      if (isList) {
        return (
          <ul key={`list-${index}`} className="ml-5 list-disc space-y-1 text-white/70">
            {lines.map((line, lineIndex) => (
              <li key={`item-${index}-${lineIndex}`}>{line.replace(/^-\\s*/, "")}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={`para-${index}`} className="text-white/70">
          {block}
        </p>
      );
    });
}

// 1. Make the function async and type params as a Promise
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. Await the parameters before using them
  const { slug } = await params;
  
  // 3. Look up projects using the resolved 'slug' variable
  const project = projects.find((item) => item.slug === slug);
  const otherProjects = projects.filter((item) => item.slug !== slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--color-6)] font-sans flex flex-col items-center justify-center">
        <div className="text-2xl text-[var(--color-4)]">Project not found</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-6)] font-sans px-4 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex flex-col lg:flex-row lg:h-[calc(100vh-80px)] lg:overflow-hidden">
        
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-1/4 h-full overflow-y-auto border-r border-white/10 pr-4 flex flex-col gap-4">
          {projects.map((item) => {
            // 4. Update the active check to use the resolved 'slug'
            const isActive = item.slug === slug;
            return (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className={`rounded-2xl border p-4 transition-all duration-300 ${
                  isActive
                    ? "border-emerald-500/20 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                </div>
                {/* Tech tags / mapping below... */}
              </Link>
            );
          })}
        </aside>
        
        <section className="w-full lg:w-3/4 h-full lg:overflow-y-auto lg:pl-6">
          <div className="max-w-4xl">
            <Link href="/projects" className="text-sm font-semibold text-white/60 hover:text-white">
              ← Go Back
            </Link>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white">{project.title}</h1>

            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-white/70">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  GitHub ↗
                </a>
              )}
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Live Demo ↗
                </a>
              )}
              {project.links?.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  App Store ↗
                </a>
              )}
              {project.links?.playStore && (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Play Store ↗
                </a>
              )}
              {project.links?.figma && (
                <a
                  href={project.links.figma}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Figma ↗
                </a>
              )}
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70">
              {renderMarkdown(project.description)}
            </div>

            {project.features?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-white">Features</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-white/70">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.tech?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={`${project.slug}-${tech}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.screenshots?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-white">Screenshots</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {project.screenshots.map((src, index) => (
                    <Image
                      key={`${project.slug}-shot-${index}`}
                      src={src}
                      alt={`${project.title} screenshot`}
                      width={800}
                      height={600}
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 lg:hidden">
              <h2 className="text-lg font-semibold text-white">Other Projects</h2>
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                {otherProjects.map((item) => (
                  <Link
                    key={`mobile-${item.slug}`}
                    href={`/projects/${item.slug}`}
                    className="min-w-[240px] rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20"
                  >
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-xs text-white/60">{item.short}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
