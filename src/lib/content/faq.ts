import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type FAQQuestion } from '@/types/content';

interface FAQContent {
  frontmatter: {
    title: string;
    description: string;
    questions: FAQQuestion[];
  };
}

export function getFAQContent(locale: string): FAQContent {
  const filePath = path.join(process.cwd(), 'content', locale, 'faq', 'index.mdx');

  if (!fs.existsSync(filePath)) {
    return {
      frontmatter: {
        title: 'FAQ',
        description: 'Common questions',
        questions: [],
      },
    };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return {
    frontmatter: data as FAQContent['frontmatter'],
  };
}