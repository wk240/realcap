import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Frontmatter {
  title: string;
  description: string;
  [key: string]: string | string[] | number | boolean | object;
}

interface MdxContent {
  content: string;
  frontmatter: Frontmatter;
}

export async function getMdxContent(
  locale: string,
  contentType: string,
  slug?: string
): Promise<MdxContent | null> {
  const basePath = slug
    ? path.join(process.cwd(), 'content', locale, contentType, `${slug}.mdx`)
    : path.join(process.cwd(), 'content', locale, `${contentType}.mdx`);

  if (!fs.existsSync(basePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(basePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    content,
    frontmatter: data as Frontmatter,
  };
}

export async function getMdxSlugs(
  locale: string,
  contentType: string
): Promise<string[]> {
  const basePath = path.join(process.cwd(), 'content', locale, contentType);

  if (!fs.existsSync(basePath)) {
    return [];
  }

  const files = fs.readdirSync(basePath);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}