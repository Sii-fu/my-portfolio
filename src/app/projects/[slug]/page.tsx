import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ProjectSlider from '@/components/ProjectSlider';
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // Import rehype-raw
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getAllProjects()]);

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
          {allProjects.map((item) => {
            const isActive = item.slug === slug;
            return (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className={`rounded-2xl border p-4 transition-all duration-300 ${isActive
                  ? "border-emerald-500/20 bg-emerald-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                </div>
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
                  GitHub
                </a>
              )}
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Live Demo
                </a>
              )}
              {project.links?.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red/20 bg-white/5 text-white/80 text-xs font-semibold tracking-wide transition-all hover:bg-white/10 hover:border-white/40 hover:text-white shadow-sm"
                >
                  Apple App Store
                </a>
              )}
              {project.links?.playStore && (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold tracking-wide transition-all hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:text-emerald-200 shadow-sm"
                >
                  Google Play Store
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

            {/* Render with custom components and rehypeRaw */}
            <div className="prose prose-invert mt-6 max-w-none hover:prose-a:text-emerald-400">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // Overrides paragraph blocks to prevent illegal nesting
                  p: (props: any) => {
                    const { children } = props;

                    // Unwraps paragraphs containing any component carrying 'folder' or 'images' props
                    const hasSlider = React.Children.toArray(children).some(
                      (child: any) =>
                        child &&
                        typeof child === 'object' &&
                        child.props &&
                        ('folder' in child.props || 'images' in child.props)
                    );

                    if (hasSlider) {
                      // Render a fragment. The ProjectSlider already manages its own margins (my-8)
                      return <>{children}</>;
                    }

                    return <p {...props}>{children}</p>;
                  },
                  'project-slider': (props: any) => {
                    const { folder, images, aspect } = props;
                    const imageList = typeof images === 'string'
                      ? images.split(',').map((img: string) => img.trim())
                      : [];

                    return <ProjectSlider folder={folder} images={imageList} aspect={aspect} />;
                  }
                } as any}
              >
                {project.content}
              </ReactMarkdown>
            </div>

            <div className="mt-12 lg:hidden">
              <h2 className="text-lg font-semibold text-white">Other Projects</h2>
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                {allProjects
                  .filter((item) => item.slug !== slug)
                  .map((item) => (
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