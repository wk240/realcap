'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { type Industry } from '@/types/content';

interface TrustProblemSectionProps {
  problems: Array<{
    industry: Industry;
    title: string;
    description: string;
    stats?: string;
  }>;
}

export function TrustProblemSection({ problems }: TrustProblemSectionProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('trustProblem');
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <article key={problem.industry} className="bg-gray-50 rounded-lg p-6">
              <div className="text-sm font-medium text-blue-600 mb-2">
                {problem.industry.toUpperCase()}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {problem.description}
              </p>
              {problem.stats && (
                <div className="text-sm font-bold text-red-600 mb-4">
                  {problem.stats}
                </div>
              )}
              <Link href={`${prefix}/solutions/${problem.industry}`}>
                {t('learnMore')}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}