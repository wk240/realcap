interface SoftwareApplicationSchemaProps {
  locale: string;
}

export function SoftwareApplicationSchema({ locale }: SoftwareApplicationSchemaProps) {
  // NOTE: No aggregateRating - removed fake reviews per SEO audit
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RealCap',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows, macOS, Web',
    description: locale === 'en'
      ? 'Trusted screenshot tool that prevents AI forgery and enables verification'
      : '可信截图工具，防止AI伪造并支持验证',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'RealCap',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}