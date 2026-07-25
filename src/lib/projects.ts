import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type ProjectCategory = "mobile" | "web-ai" | "iot" | "desktop";
export type ProjectBadge = "Production" | "Internship" | "Academic";

export type ProjectLinks = {
  github?: string;
  live?: string;
  appStore?: string;
  playStore?: string;
  figma?: string;
};

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  short: string;
  badge: ProjectBadge;
  category: ProjectCategory;
  tech: string[];
  links?: ProjectLinks;
};

export type ProjectRecord = ProjectFrontmatter & {
  content: string;
  fileName: string;
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function toLinks(value: unknown): ProjectLinks | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const links = value as Record<string, unknown>;
  const normalized: ProjectLinks = {};

  for (const key of ["github", "live", "appStore", "playStore", "figma"] as const) {
    if (typeof links[key] === "string" && links[key].trim()) {
      normalized[key] = links[key].trim();
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function normalizeProject(fileName: string, data: Record<string, any>, content: string): ProjectRecord {
  const slug = typeof data.slug === "string" && data.slug.trim() ? data.slug.trim() : fileName.replace(/\.md$/i, "");

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    short: typeof data.short === "string" ? data.short : "",
    badge: (data.badge as ProjectBadge) ?? "Academic",
    category: (data.category as ProjectCategory) ?? "desktop",
    tech: toArray(data.tech),
    links: toLinks(data.links),
    content,
    fileName,
  };
}

export async function getAllProjects(): Promise<ProjectRecord[]> {
  const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  return Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(projectsDirectory, fileName);
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return normalizeProject(fileName, data, content);
    }),
  );
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  try {
    const filePath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return normalizeProject(`${slug}.md`, data, content);
  } catch (e) {
    try {
      const projects = await getAllProjects();
      return projects.find((project) => project.slug === slug) ?? null;
    } catch {
      return null;
    }
  }
}