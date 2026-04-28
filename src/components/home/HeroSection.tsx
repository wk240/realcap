'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  const t = useTranslations('hero');

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
              {t('secondaryCta')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}