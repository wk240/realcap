'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function DataCaseSection() {
  const t = useTranslations('dataCase');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const stats = [
    { id: 'users', value: '10,000+' },
    { id: 'verifications', value: '1M+' },
    { id: 'accuracy', value: '99.9%' },
    { id: 'fraudPrevented', value: '$50M+' },
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {t(`stats.${stat.id}`)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`${prefix}/blog/cases/lending-platform-fraud-case`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            {t('readSuccessStories')}
          </Link>
        </div>
      </Container>
    </section>
  );
}