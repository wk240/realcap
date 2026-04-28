import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { FAQItem } from '@/components/faq/FAQItem';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { getFAQContent, getAllFAQQuestions, getAllFAQTopics } from '@/lib/content/faq';

interface FAQPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqContent = getFAQContent(locale);
  const allQuestions = getAllFAQQuestions(locale);
  const topics = getAllFAQTopics(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <FAQSchema questions={allQuestions} />
      <Container size="md" className="py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {faqContent.frontmatter.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {faqContent.frontmatter.description}
        </p>

        {/* Topics navigation */}
        {topics.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`${prefix}/faq/${topic.slug}`}
                variant="outline"
                className="text-sm px-3 py-1.5"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        )}

        {/* FAQ questions */}
        <div className="max-w-2xl">
          {topics.length > 0 ? (
            // Render questions grouped by topic
            topics.map((topic) => (
              <section key={topic.slug} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                  {topic.name}
                </h2>
                {topic.questions.map((faq, index) => (
                  <FAQItem
                    key={faq.slug || index}
                    question={faq.question}
                    answer={faq.answer}
                    defaultOpen={index === 0}
                  />
                ))}
              </section>
            ))
          ) : (
            // Render legacy flat questions
            allQuestions.map((faq, index) => (
              <FAQItem
                key={faq.slug || index}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={index === 0}
              />
            ))
          )}
        </div>
      </Container>
    </>
  );
}