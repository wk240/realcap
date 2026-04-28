import type { MDXComponents } from 'mdx/types';

export function getMdxComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 hover:underline">{children}</a>
    ),
  };
}