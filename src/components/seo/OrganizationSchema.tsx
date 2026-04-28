interface OrganizationSchemaProps {
  locale: string;
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RealCap',
    url: 'https://realcap.app',
    logo: 'https://realcap.app/assets/images/logo.png',
    sameAs: [
      'https://twitter.com/wen_nkang',
      'https://github.com/wk240/realcap',
    ],
    description: locale === 'en'
      ? 'Trusted screenshot tool that prevents AI forgery and enables verification'
      : '可信截图工具，防止AI伪造并支持验证',
    contactInfo: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@realcap.app',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}