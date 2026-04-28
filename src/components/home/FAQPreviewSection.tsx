'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';
import { type FAQQuestion } from '@/types/content';

interface FAQPreviewSectionProps {
  questions: FAQQuestion[];
}

export function FAQPreviewSection({ questions }: FAQPreviewSectionProps) {
  const t = useTranslations('faqPreview');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {questions.slice(0, 3).map((faq) => (
            <article key={faq.slug} className="border-b border-gray-200 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={`${prefix}/faq`} variant="button">
            {t('viewAll')}
          </Link>
        </div>
      </Container>
    </section>
  );
}