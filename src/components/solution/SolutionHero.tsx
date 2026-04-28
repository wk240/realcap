'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { type Industry } from '@/types/content';
import { getIndustryInfo, getIndustryName } from '@/lib/content/industries';

interface SolutionHeroProps {
  industry: Industry;
  title: string;
  description: string;
}

export function SolutionHero({ industry, title, description }: SolutionHeroProps) {
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const industryInfo = getIndustryInfo(industry);
  const industryName = getIndustryName(industry, locale);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <Container size="lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{industryInfo?.icon}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {description}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link href={`${prefix}/signup`} variant="button">
            {locale === 'en' ? 'Start Free Trial' : '免费试用'}
          </Link>
          <Link href={`${prefix}/pricing`} variant="outline">
            {locale === 'en' ? 'View Pricing' : '查看价格'}
          </Link>
        </div>
      </Container>
    </section>
  );
}