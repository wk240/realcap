import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
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
import { getFAQContent } from '@/lib/content/faq';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeContent = getHomeContent(locale);
  const faqContent = getFAQContent(locale);

  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <CoreFeaturesSection />
      <TargetIndustriesSection />
      <UseCasesSection useCases={homeContent.frontmatter.useCases} />
      <DataCaseSection />
      <FAQPreviewSection questions={faqContent.frontmatter.questions} />
      <BottomCTASection />
    </>
  );
}