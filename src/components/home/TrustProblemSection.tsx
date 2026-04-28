'use client';

import { useLocale } from 'next-intl';
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
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en'
              ? 'The Growing Threat of Fake Screenshots'
              : '虚假截图日益严重的威胁'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'AI-generated fake screenshots are causing billions in losses across industries. Traditional verification methods fail against sophisticated forgery techniques.'
              : 'AI生成的虚假截图正在给各行各业造成数十亿美元的损失。传统验证方法无法应对复杂的伪造技术。'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <article key={index} className="bg-gray-50 rounded-lg p-6">
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
                {locale === 'en' ? 'Learn More' : '了解更多'}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}