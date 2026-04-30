import { setRequestLocale } from 'next-intl/server';
import { RedirectChinese } from '@/components/RedirectChinese';
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

export default async function RootPage() {
  setRequestLocale('en');

  const homeContent = getHomeContent('en');
  const faqQuestions = getAllFAQQuestions('en');

  return (
    <>
      <RedirectChinese />
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <CoreFeaturesSection />
      <TargetIndustriesSection />
      <UseCasesSection useCases={homeContent.frontmatter.useCases} />
      <DataCaseSection />
      <FAQPreviewSection questions={faqQuestions} />
      <BottomCTASection />
    </>
  );
}