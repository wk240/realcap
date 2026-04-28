'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { type Locale } from '@/i18n.config';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale() as Locale;

  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
      <Container size="lg">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary">
              {t('cta')}
            </Button>
            <Button size="lg" variant="outline">
              {locale === 'en' ? 'Learn More' : '了解更多'}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}