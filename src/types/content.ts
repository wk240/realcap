export interface BlogFrontmatter {
  title: string;
  description: string;
  category: BlogCategory;
  industry: Industry[];
  keywords: string[];
  author: string;
  publishDate: string;
  lastModified: string;
  readingTime: number;
  featured: boolean;
  image: string;
  tags: string[];
  relatedArticles: string[];
  cta?: {
    text: string;
    link: string;
  };
}

export interface SolutionFrontmatter {
  title: string;
  description: string;
  industry: Industry;
  keywords: string[];
  targetAudience: string;
  painPoints: string[];
  features: string[];
  caseStudy?: string;
  relatedArticles: string[];
  pricingLink: string;
  apiDocsLink: string;
}

export interface DocFrontmatter {
  title: string;
  description: string;
  section: DocSection;
  category: string;
  keywords: string[];
  order: number;
  prevPage?: string;
  nextPage?: string;
  codeExamples?: { language: string }[];
}

export type BlogCategory = 'fraud-detection' | 'cases' | 'tutorials' | 'reports';
export type Industry = 'lending' | 'mcn' | 'matchmaking' | 'gaming' | 'rental';
export type DocSection = 'getting-started' | 'api' | 'integration';

export interface UseCase {
  title: string;
  description: string;
  articleSlug: string;
  category: BlogCategory;
}

export interface Article {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  locale: string;
}

export interface Solution {
  industry: Industry;
  frontmatter: SolutionFrontmatter;
  content: string;
  locale: string;
}

export interface DocPage {
  section: DocSection;
  slug: string;
  frontmatter: DocFrontmatter;
  content: string;
  locale: string;
}