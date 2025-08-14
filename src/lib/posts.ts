import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = {
  title: string;
  date: string;
  tags?: string[];
  slug: string;
};

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const dateValue = (data as any).date;
      const date = dateValue
        ? new Date(dateValue).toISOString().slice(0, 10)
        : "";
      return {
        title: (data as any).title ?? slug,
        date,
        tags: (data as any).tags ?? [],
        slug,
      } as PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<{ meta: PostMeta; html: string } | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  return {
    meta: {
      title: (data as any).title ?? slug,
      date: (data as any).date
        ? new Date((data as any).date).toISOString().slice(0, 10)
        : "",
      tags: (data as any).tags ?? [],
      slug,
    },
    html: processed.toString(),
  };
}


