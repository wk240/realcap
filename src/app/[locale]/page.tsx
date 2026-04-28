import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustProblemSection } from '@/components/home/TrustProblemSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TargetIndustriesSection } from '@/components/home/TargetIndustriesSection';
import { getHomeContent } from '@/lib/content/home';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeContent = getHomeContent(locale);

  return (
    <>
      <HeroSection />
      <TrustProblemSection problems={homeContent.frontmatter.problems} />
      <HowItWorksSection />
      <TargetIndustriesSection />
    </>
  );
}