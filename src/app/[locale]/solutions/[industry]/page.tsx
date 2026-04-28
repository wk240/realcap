import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { type Industry, type SolutionFrontmatter } from '@/types/content';
import { industries } from '@/lib/content/industries';
import { getMdxContent } from '@/lib/mdx/getMdxContent';
import { SolutionHero } from '@/components/solution/SolutionHero';
import { PainPointsSection } from '@/components/solution/PainPointsSection';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Container } from '@/components/ui/Container';
import { notFound } from 'next/navigation';

interface SolutionIndustryPageProps {
  params: Promise<{ locale: Locale; industry: Industry }>;
}

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'zh'];

  return locales.flatMap((locale) =>
    industries.map((industry) => ({
      locale,
      industry: industry.slug,
    }))
  );
}

export default async function SolutionIndustryPage({ params }: SolutionIndustryPageProps) {
  const { locale, industry } = await params;
  setRequestLocale(locale);

  const content = await getMdxContent(locale, 'solutions', industry);

  if (!content) {
    notFound();
  }

  const frontmatter = content.frontmatter as unknown as SolutionFrontmatter;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const baseUrl = 'https://realcap.app';
  const url = `${baseUrl}${prefix}/solutions/${industry}`;

  return (
    <>
      <ProductSchema
        name={frontmatter.title}
        description={frontmatter.description}
        url={url}
      />
      <Container size="lg" className="py-12">
        <Breadcrumb
          items={[
            { label: locale === 'en' ? 'Home' : '首页', href: `${prefix}/` },
            { label: locale === 'en' ? 'Solutions' : '解决方案', href: `${prefix}/solutions` },
            { label: frontmatter.title, href: `${prefix}/solutions/${industry}` },
          ]}
        />
      </Container>
      <SolutionHero
        industry={industry}
        title={frontmatter.title}
        description={frontmatter.description}
      />
      <PainPointsSection painPoints={frontmatter.painPoints || []} />
    </>
  );
}