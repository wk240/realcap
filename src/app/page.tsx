import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { CoreFeaturesSection } from '@/components/home/CoreFeaturesSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { UseCasesSection } from '@/components/home/UseCasesSection';
import { DataCaseSection } from '@/components/home/DataCaseSection';
import { FAQPreviewSection } from '@/components/home/FAQPreviewSection';
import { BottomCTASection } from '@/components/home/BottomCTASection';
import { getHomeContent } from '@/lib/content/home';
import { getAllFAQQuestions } from '@/lib/content/faq';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { WebSiteSchema } from '@/components/seo/WebSiteSchema';
import { SoftwareApplicationSchema } from '@/components/seo/SoftwareApplicationSchema';

export default async function RootPage() {
  const messages = await getMessages({ locale: 'en' });
  const homeContent = getHomeContent('en');
  const faqQuestions = getAllFAQQuestions('en');

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <head>
        <OrganizationSchema locale="en" />
        <WebSiteSchema />
        <SoftwareApplicationSchema locale="en" />
      </head>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustProblemSection problems={homeContent.frontmatter.problems} />
        <HowItWorksSection />
        <CoreFeaturesSection />
        <TargetIndustriesSection />
        <UseCasesSection useCases={homeContent.frontmatter.useCases} />
        <DataCaseSection />
        <FAQPreviewSection questions={faqQuestions} />
        <BottomCTASection />
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
