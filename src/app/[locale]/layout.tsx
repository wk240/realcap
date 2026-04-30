import { locales, type Locale } from '@/i18n.config';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { WebSiteSchema } from '@/components/seo/WebSiteSchema';
import { SoftwareApplicationSchema } from '@/components/seo/SoftwareApplicationSchema';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://realcap.app';

  return {
    title: {
      default: t('title'),
      template: `%s | RealCap`,
    },
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale === 'en' ? '' : locale}`,
      languages: {
        'en': `${siteUrl}`,
        'zh': `${siteUrl}/zh`,
        'x-default': `${siteUrl}`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale === 'en' ? '' : locale}`,
      siteName: 'RealCap',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      site: '@wen_nkang',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <>
      <head>
        <OrganizationSchema locale={locale} />
        <WebSiteSchema />
        <SoftwareApplicationSchema locale={locale} />
      </head>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}