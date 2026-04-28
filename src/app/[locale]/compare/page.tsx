import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';

interface ComparePageProps {
  params: Promise<{ locale: Locale }>;
}

const comparisons = [
  {
    slug: 'background-check-services',
    titleEn: 'RealCap vs Background Check Services',
    titleZh: 'RealCap vs 背景调查服务',
    descEn: 'Compare RealCap with traditional background check services for verification.',
    descZh: '对比 RealCap 与传统背景调查服务的验证方案。',
  },
  {
    slug: 'manual-vs-automated',
    titleEn: 'Manual vs Automated Verification',
    titleZh: '人工验证 vs 自动化验证',
    descEn: 'Why automated verification with RealCap beats manual review processes.',
    descZh: '为什么 RealCap 的自动化验证胜过人工审核流程。',
  },
];

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh'];
  return locales.map((locale) => ({ locale }));
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {locale === 'en' ? 'Compare Verification Solutions' : '对比验证方案'}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {locale === 'en'
          ? 'See how RealCap compares to alternative verification approaches.'
          : '了解 RealCap 与其他验证方案的对比。'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`${prefix}/compare/${comparison.slug}`}
            variant="outline"
            className="block p-6 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'en' ? comparison.titleEn : comparison.titleZh}
            </h2>
            <p className="text-gray-600">
              {locale === 'en' ? comparison.descEn : comparison.descZh}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}