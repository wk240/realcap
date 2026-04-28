import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';

interface TermsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container size="md" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'Terms of Service' : '使用条款'}
      </h1>

      <div className="prose prose-lg">
        <p>
          {locale === 'en'
            ? 'By using RealCap, you agree to these terms.'
            : '使用RealCap即表示您同意这些条款。'}
        </p>

        <h2>{locale === 'en' ? 'Usage' : '使用'}</h2>
        <p>
          {locale === 'en'
            ? 'RealCap is provided for legitimate screenshot verification purposes only. You may not use it for illegal activities.'
            : 'RealCap仅用于合法截图验证目的。您不得将其用于非法活动。'}
        </p>

        <h2>{locale === 'en' ? 'Liability' : '责任'}</h2>
        <p>
          {locale === 'en'
            ? 'RealCap provides verification services but does not guarantee absolute accuracy. Users are responsible for their use of verification results.'
            : 'RealCap提供验证服务但不保证绝对准确。用户对验证结果的使用负责。'}
        </p>
      </div>
    </Container>
  );
}