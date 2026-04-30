import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { WebSiteSchema } from '@/components/seo/WebSiteSchema';
import { SoftwareApplicationSchema } from '@/components/seo/SoftwareApplicationSchema';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://realcap.app';

  return {
    title: {
      default: 'RealCap - Trusted Screenshot Tool',
      template: `%s | RealCap`,
    },
    description: 'Prevent AI forgery with trusted screenshot verification. RealCap provides verifiable capture proof for financial transactions, legal evidence, and communication records.',
    alternates: {
      canonical: siteUrl,
      languages: {
        'en': siteUrl,
        'zh': `${siteUrl}/zh`,
        'x-default': siteUrl,
      },
    },
    openGraph: {
      title: 'RealCap - Trusted Screenshot Tool',
      description: 'Prevent AI forgery with trusted screenshot verification.',
      url: siteUrl,
      siteName: 'RealCap',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'RealCap - Trusted Screenshot Tool',
      description: 'Prevent AI forgery with trusted screenshot verification.',
      site: '@wen_nkang',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale: 'en' });

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <OrganizationSchema locale="en" />
        <WebSiteSchema />
        <SoftwareApplicationSchema locale="en" />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale="en" messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}