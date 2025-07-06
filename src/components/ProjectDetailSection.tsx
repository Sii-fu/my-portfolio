import Image from "next/image";

interface Project {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  tech: string[];
  screenshots: string[];
}

export function ProjectDetailSection({ project }: { project: Project }) {
  return (
    <section id={project.slug} className=" pt-10 px-10 scroll-mt-16 transition-all duration-1000">
      <div className="min-h-180 bg-[var(--color-5)] rounded-lg shadow-md p-6 mb-4 border border-[var(--color-3)]">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--color-0)] tracking-tight leading-tight">{project.title}</h2>
        <div className="text-[var(--color-1)] text-base mb-4 leading-relaxed tracking-wide">
          {project.description}
        </div>
        {project.features && (
          <ul className="list-disc list-inside ml-4 text-[var(--color-2)] mb-4">
            {project.features.map((f: string, i: number) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
        {project.tech && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.map((t: string, i: number) => (
              <span key={i} className="bg-[var(--color-1)] px-2 py-1 rounded-full text-xs text-[var(--color-6)] font-medium">{t}</span>
            ))}
          </div>
        )}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {project.screenshots.map((src: string, i: number) => (
              <Image key={i} src={src} alt={project.title + " screenshot"} width={600} height={400} className="rounded-lg border border-[var(--color-3)] object-cover w-full h-auto" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
