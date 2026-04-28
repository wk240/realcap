import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type FAQQuestion } from '@/types/content';

interface FAQTopic {
  slug: string;
  name: string;
  questions: FAQQuestion[];
}

interface FAQContent {
  frontmatter: {
    title: string;
    description: string;
    topics?: FAQTopic[];
    questions?: FAQQuestion[];
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

export function getAllFAQQuestions(locale: string): FAQQuestion[] {
  const content = getFAQContent(locale);

  // If topics exist, flatten all questions from topics
  if (content.frontmatter.topics && content.frontmatter.topics.length > 0) {
    return content.frontmatter.topics.flatMap(topic => topic.questions);
  }

  // Otherwise, return the legacy questions array
  return content.frontmatter.questions || [];
}

export function getFAQTopic(locale: string, topicSlug: string): FAQTopic | null {
  const content = getFAQContent(locale);

  if (!content.frontmatter.topics) {
    return null;
  }

  return content.frontmatter.topics.find(topic => topic.slug === topicSlug) || null;
}

export function getAllFAQTopics(locale: string): FAQTopic[] {
  const content = getFAQContent(locale);
  return content.frontmatter.topics || [];
}