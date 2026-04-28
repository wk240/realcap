'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function HowItWorksSection() {
  const locale = useLocale() as Locale;
  const t = useTranslations('howItWorks');
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const steps = [
    {
      number: '01',
      title: t('steps.capture.title'),
      description: t('steps.capture.description'),
    },
    {
      number: '02',
      title: t('steps.process.title'),
      description: t('steps.process.description'),
    },
    {
      number: '03',
      title: t('steps.verify.title'),
      description: t('steps.verify.description'),
    },
    {
      number: '04',
      title: t('steps.share.title'),
      description: t('steps.share.description'),
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <article key={step.number} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`${prefix}/docs/getting-started`} variant="button">
            {t('docsLink')}
          </Link>
        </div>
      </Container>
    </section>
  );
}