import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n.config';
import { Container } from '@/components/ui/Container';
import { PricingCard } from '@/components/pricing/PricingCard';

interface PricingPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tiers = [
    {
      tier: 'basic' as const,
      name: locale === 'en' ? 'Basic' : '基础版',
      price: locale === 'en' ? 'Free' : '免费',
      features: locale === 'en'
        ? ['100 verifications/month', 'Basic API access', 'Email support']
        : ['每月100次验证', '基础API访问', '邮件支持'],
    },
    {
      tier: 'pro' as const,
      name: locale === 'en' ? 'Pro' : '专业版',
      price: locale === 'en' ? '$49/month' : '¥299/月',
      features: locale === 'en'
        ? ['10,000 verifications/month', 'Advanced API', 'Priority support', 'Batch processing']
        : ['每月10,000次验证', '高级API', '优先支持', '批量处理'],
      highlighted: true,
    },
    {
      tier: 'enterprise' as const,
      name: locale === 'en' ? 'Enterprise' : '企业版',
      price: locale === 'en' ? 'Custom' : '定制',
      features: locale === 'en'
        ? ['Unlimited verifications', 'Private deployment', 'Dedicated support', 'Custom integration']
        : ['无限验证', '私有部署', '专属支持', '定制集成'],
    },
  ];

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        {locale === 'en' ? 'Pricing' : '价格'}
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        {locale === 'en'
          ? 'Choose the plan that fits your verification needs'
          : '选择适合您验证需求的方案'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <PricingCard key={tier.tier} {...tier} />
        ))}
      </div>
    </Container>
  );
}