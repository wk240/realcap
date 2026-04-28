'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { industries } from '@/lib/content/industries';

export function TargetIndustriesSection() {
  const t = useTranslations('targetIndustries');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`${prefix}/solutions/${industry.slug}`}
              className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
            >
              <div className="text-3xl mb-4 text-center">{industry.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                {locale === 'en' ? industry.nameEn : industry.nameZh}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {locale === 'en' ? industry.descriptionEn : industry.descriptionZh}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {t('customSolution')}
          </p>
          <Link href={`${prefix}/contact`} variant="button">
            {t('contactLink')}
          </Link>
        </div>
      </Container>
    </section>
  );
}