'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function BottomCTASection() {
  const t = useTranslations('bottomCTA');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <Container size="md">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary">
              {t('downloadFree')}
            </Button>
            <Link href={`${prefix}/pricing`} variant="button" className="bg-gray-200 text-gray-900 hover:bg-gray-300">
              {t('viewPricing')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}