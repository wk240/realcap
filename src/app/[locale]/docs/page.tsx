import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';

interface DocsIndexPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function DocsIndexPage({ params }: DocsIndexPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const sections = [
    {
      slug: 'getting-started',
      name: locale === 'en' ? 'Getting Started' : '快速开始',
      description: locale === 'en' ? 'Quick setup and first verification' : '快速设置和首次验证',
    },
    {
      slug: 'api',
      name: locale === 'en' ? 'API Reference' : 'API参考',
      description: locale === 'en' ? 'Complete API documentation' : '完整API文档',
    },
    {
      slug: 'integration',
      name: locale === 'en' ? 'Integration Guides' : '集成指南',
      description: locale === 'en' ? 'Platform-specific integration' : '平台特定集成',
    },
  ];

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {locale === 'en' ? 'Documentation' : '文档'}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {locale === 'en'
          ? 'Learn how to integrate RealCap screenshot verification'
          : '学习如何集成RealCap截图验证'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <Link
            key={section.slug}
            href={`${prefix}/docs/${section.slug}`}
            className="block bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {section.name}
            </h2>
            <p className="text-gray-600">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}