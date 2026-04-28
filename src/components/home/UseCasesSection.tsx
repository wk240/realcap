'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { type UseCase } from '@/types/content';

interface UseCasesSectionProps {
  useCases: UseCase[];
}

export function UseCasesSection({ useCases }: UseCasesSectionProps) {
  const t = useTranslations('useCases');
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <article key={useCase.articleSlug} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {useCase.description}
              </p>
              <Link href={`${prefix}/blog/${useCase.category}/${useCase.articleSlug}`}>
                {t('readCase')} →
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`${prefix}/blog/cases`} variant="button">
            {t('viewAll')}
          </Link>
        </div>
      </Container>
    </section>
  );
}