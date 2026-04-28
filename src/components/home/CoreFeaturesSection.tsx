'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { type Locale } from '@/i18n.config';

export function CoreFeaturesSection() {
  const t = useTranslations('coreFeatures');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const features = [
    {
      id: 'trustedCapture',
      link: `${prefix}/docs/trusted-capture`,
      icon: 'shield',
    },
    {
      id: 'aiDetection',
      link: `${prefix}/docs/ai-detection`,
      icon: 'scan',
    },
    {
      id: 'verificationApi',
      link: `${prefix}/docs/api/verify`,
      icon: 'code',
    },
    {
      id: 'crossPlatform',
      link: `${prefix}/docs/integration`,
      icon: 'devices',
    },
  ];

  return (
    <section className="py-16 bg-blue-50">
      <Container size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <article key={feature.id} className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name={feature.icon} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(`features.${feature.id}.title`)}
              </h3>
              <p className="text-gray-600 mb-4">
                {t(`features.${feature.id}.description`)}
              </p>
              <Link href={feature.link}>
                {t('learnMore')}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    scan: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    code: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    devices: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  };

  return icons[name] || null;
}