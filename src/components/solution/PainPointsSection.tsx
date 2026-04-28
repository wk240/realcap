'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { type Locale } from '@/i18n.config';

interface PainPointsSectionProps {
  painPoints: string[];
}

export function PainPointsSection({ painPoints }: PainPointsSectionProps) {
  const locale = useLocale() as Locale;

  return (
    <section className="py-12 bg-white">
      <Container size="lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {locale === 'en' ? 'Industry Pain Points' : '行业痛点'}
        </h2>
        <ul className="space-y-4">
          {painPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
              <div className="text-red-600 font-bold">X</div>
              <div className="text-gray-700">{point}</div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}