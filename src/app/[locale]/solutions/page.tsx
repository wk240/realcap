import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { industries } from '@/lib/content/industries';

interface SolutionsIndexPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function SolutionsIndexPage({ params }: SolutionsIndexPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {locale === 'en' ? 'Industry Solutions' : '行业解决方案'}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {locale === 'en'
          ? 'RealCap provides specialized screenshot verification solutions for trust-sensitive industries'
          : 'RealCap为信任敏感行业提供专业截图验证解决方案'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`${prefix}/solutions/${industry.slug}`}
            className="block bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-4">{industry.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'en' ? industry.nameEn : industry.nameZh}
            </h2>
            <p className="text-gray-600">
              {locale === 'en' ? industry.descriptionEn : industry.descriptionZh}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}