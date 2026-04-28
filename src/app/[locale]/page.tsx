import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { HeroSection } from '@/components/home/HeroSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      {/* Additional sections will be added */}
    </>
  );
}