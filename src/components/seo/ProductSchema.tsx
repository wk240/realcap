interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function ProductSchema({ name, description, url }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: 'RealCap',
    },
    category: 'Screenshot Verification',
    offers: {
      '@type': 'Offer',
      url,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'CNY',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}