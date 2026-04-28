interface ArticleSchemaProps {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate: string;
  image?: string;
  url: string;
}

export function ArticleSchema({
  title,
  description,
  publishDate,
  modifiedDate,
  image,
  url,
}: ArticleSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: 'RealCap',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RealCap',
      url: 'https://realcap.app',
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  if (image) {
    schema.image = image;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}