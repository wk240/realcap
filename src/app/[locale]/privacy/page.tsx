import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';

interface PrivacyPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container size="md" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'Privacy Policy' : '隐私政策'}
      </h1>

      <div className="prose prose-lg">
        <p>
          {locale === 'en'
            ? 'RealCap respects your privacy. This policy describes how we handle your data.'
            : 'RealCap尊重您的隐私。本政策描述我们如何处理您的数据。'}
        </p>

        <h2>{locale === 'en' ? 'Data Collection' : '数据收集'}</h2>
        <p>
          {locale === 'en'
            ? 'We collect minimal data necessary for screenshot verification. Screenshots are processed and not stored permanently.'
            : '我们收集截图验证所需的最少数据。截图经过处理后不会永久存储。'}
        </p>

        <h2>{locale === 'en' ? 'Data Security' : '数据安全'}</h2>
        <p>
          {locale === 'en'
            ? 'All data is encrypted and processed securely. We do not share your data with third parties.'
            : '所有数据加密并安全处理。我们不与第三方分享您的数据。'}
        </p>
      </div>
    </Container>
  );
}