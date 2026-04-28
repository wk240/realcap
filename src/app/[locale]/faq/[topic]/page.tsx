import { setRequestLocale } from 'next-intl/server';
import { type Locale, locales } from '@/i18n.config';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { FAQItem } from '@/components/faq/FAQItem';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { getFAQContent, getFAQTopic, getAllFAQTopics } from '@/lib/content/faq';

interface FAQTopicPageProps {
  params: Promise<{ locale: Locale; topic: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; topic: string }[] = [];

  for (const locale of locales) {
    const topics = getAllFAQTopics(locale);
    for (const topic of topics) {
      params.push({ locale, topic: topic.slug });
    }
  }

  return params;
}

export default async function FAQTopicPage({ params }: FAQTopicPageProps) {
  const { locale, topic: topicSlug } = await params;
  setRequestLocale(locale);

  const faqContent = getFAQContent(locale);
  const topic = getFAQTopic(locale, topicSlug);
  const allTopics = getAllFAQTopics(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  if (!topic) {
    notFound();
  }

  return (
    <>
      <FAQSchema questions={topic.questions} />
      <Container size="md" className="py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href={`${prefix}/faq`} variant="muted" className="hover:underline">
            {faqContent.frontmatter.title}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{topic.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {topic.name}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {locale === 'en'
            ? `Questions about ${topic.name.toLowerCase()}`
            : `关于${topic.name}的问题`}
        </p>

        {/* Topic navigation */}
        <div className="mb-8 flex flex-wrap gap-3">
          {allTopics.map((t) => (
            <Link
              key={t.slug}
              href={`${prefix}/faq/${t.slug}`}
              variant={t.slug === topicSlug ? 'button' : 'outline'}
              className="text-sm px-3 py-1.5"
            >
              {t.name}
            </Link>
          ))}
        </div>

        {/* FAQ questions */}
        <div className="max-w-2xl">
          {topic.questions.map((faq, index) => (
            <FAQItem
              key={faq.slug || index}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </Container>
    </>
  );
}