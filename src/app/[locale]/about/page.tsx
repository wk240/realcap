import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container size="md" className="py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'en' ? 'About RealCap' : '关于RealCap'}
      </h1>

      <div className="prose prose-lg">
        <p>
          {locale === 'en'
            ? 'RealCap is a trusted screenshot tool that prevents AI forgery and enables verification. We help organizations verify screenshot authenticity and prevent fraud.'
            : 'RealCap是一款可信截图工具，防止AI伪造并支持验证。我们帮助组织验证截图真实性并防止欺诈。'}
        </p>

        <h2>{locale === 'en' ? 'Our Mission' : '我们的使命'}</h2>
        <p>
          {locale === 'en'
            ? 'To build trust in digital evidence by providing reliable screenshot verification technology.'
            : '通过提供可靠的截图验证技术，建立数字证据的信任。'}
        </p>

        <h2>{locale === 'en' ? 'Contact' : '联系方式'}</h2>
        <p>
          Email: support@realcap.app<br />
          Twitter: @wen_nkang<br />
          GitHub: wk240/realcap
        </p>
      </div>
    </Container>
  );
}