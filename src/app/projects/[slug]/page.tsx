import { projects } from "../data";
import Image from "next/image";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  // Fake loading delay
  await new Promise((res) => setTimeout(res, 400));

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--color-1)] font-sans flex flex-col items-center justify-center">
        <div className="text-2xl text-[var(--color-4)]">Project not found</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-1)] font-sans px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-6)] tracking-tight leading-tight">{project.title}</h1>
        <div className="prose prose-gray max-w-none mb-8 text-[var(--color-4)] tracking-wide leading-relaxed">
          <p>{project.description}</p>
        </div>
        {project.features && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-[var(--color-3)]">Features</h2>
            <ul className="list-disc list-inside ml-4 text-[var(--color-4)]">
              {project.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
        {project.tech && (
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="bg-[var(--color-2)] px-2 py-1 rounded-full text-xs text-[var(--color-6)] font-medium">{t}</span>
            ))}
          </div>
        )}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-[var(--color-3)]">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <Image key={i} src={src} alt={project.title + " screenshot"} width={600} height={400} className="rounded-lg border border-[var(--color-3)] object-cover w-full h-auto" />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
