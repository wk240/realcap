import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type Industry } from '@/types/content';

interface HomeContent {
  frontmatter: {
    title: string;
    description: string;
    problems: Array<{
      industry: Industry;
      title: string;
      description: string;
      stats: string;
    }>;
  };
}

export function getHomeContent(locale: string): HomeContent {
  const filePath = path.join(process.cwd(), 'content', locale, 'home.mdx');

  if (!fs.existsSync(filePath)) {
    return {
      frontmatter: {
        title: 'RealCap',
        description: 'Trusted screenshot tool',
        problems: [],
      },
    };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return {
    frontmatter: data as HomeContent['frontmatter'],
  };
}