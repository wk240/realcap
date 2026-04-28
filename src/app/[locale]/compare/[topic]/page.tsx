import { setRequestLocale } from 'next-intl/server';
import { type Locale, locales } from '@/i18n.config';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { CompareTable } from '@/components/compare/CompareTable';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface CompareTopicPageProps {
  params: Promise<{ locale: Locale; topic: string }>;
}

const comparisonData: Record<string, Record<Locale, { title: string; description: string; alternativeName: string; rows: Array<{ feature: string; realcap: boolean | string; alternative: boolean | string }> }>> = {
  'background-check-services': {
    en: {
      title: 'RealCap vs Background Check Services',
      description: 'Background check services verify identity through public records, but they cannot verify real-time digital activities. RealCap fills this gap with instant screenshot verification.',
      alternativeName: 'Background Check',
      rows: [
        { feature: 'Verification Speed', realcap: 'Instant', alternative: 'Days' },
        { feature: 'Digital Activity Verification', realcap: true, alternative: false },
        { feature: 'Real-time Results', realcap: true, alternative: false },
        { feature: 'API Integration', realcap: true, alternative: 'Limited' },
        { feature: 'Privacy Compliance', realcap: true, alternative: true },
        { feature: 'Cost per Verification', realcap: 'Low', alternative: 'High' },
        { feature: 'Geographic Coverage', realcap: 'Global', alternative: 'Limited' },
        { feature: 'Custom Verification Rules', realcap: true, alternative: false },
        { feature: 'Batch Processing', realcap: true, alternative: true },
        { feature: 'Historical Data', realcap: false, alternative: true },
      ],
    },
    zh: {
      title: 'RealCap vs 背景调查服务',
      description: '背景调查服务通过公共记录验证身份，但无法验证实时数字活动。RealCap 通过即时截图验证填补这一空白。',
      alternativeName: '背景调查',
      rows: [
        { feature: '验证速度', realcap: '即时', alternative: '数天' },
        { feature: '数字活动验证', realcap: true, alternative: false },
        { feature: '实时结果', realcap: true, alternative: false },
        { feature: 'API集成', realcap: true, alternative: '有限' },
        { feature: '隐私合规', realcap: true, alternative: true },
        { feature: '每次验证成本', realcap: '低', alternative: '高' },
        { feature: '地理覆盖范围', realcap: '全球', alternative: '有限' },
        { feature: '自定义验证规则', realcap: true, alternative: false },
        { feature: '批量处理', realcap: true, alternative: true },
        { feature: '历史数据', realcap: false, alternative: true },
      ],
    },
  },
  'manual-vs-automated': {
    en: {
      title: 'Manual vs Automated Verification',
      description: 'Manual verification is slow, error-prone, and expensive. RealCap automates the entire process with AI-powered screenshot analysis.',
      alternativeName: 'Manual Review',
      rows: [
        { feature: 'Processing Time', realcap: '< 1 minute', alternative: 'Hours/Days' },
        { feature: 'Scalability', realcap: 'Unlimited', alternative: 'Limited' },
        { feature: 'Consistency', realcap: true, alternative: false },
        { feature: 'Error Rate', realcap: '< 1%', alternative: '5-15%' },
        { feature: '24/7 Availability', realcap: true, alternative: false },
        { feature: 'Cost Efficiency', realcap: true, alternative: false },
        { feature: 'Audit Trail', realcap: true, alternative: 'Manual Logs' },
        { feature: 'Integration Ready', realcap: true, alternative: false },
        { feature: 'Training Required', realcap: false, alternative: true },
        { feature: 'Human Bias', realcap: false, alternative: true },
      ],
    },
    zh: {
      title: '人工验证 vs 自动化验证',
      description: '人工验证速度慢、易出错且成本高。RealCap 通过 AI 驱动的截图分析自动化整个流程。',
      alternativeName: '人工审核',
      rows: [
        { feature: '处理时间', realcap: '< 1分钟', alternative: '数小时/数天' },
        { feature: '可扩展性', realcap: '无限', alternative: '有限' },
        { feature: '一致性', realcap: true, alternative: false },
        { feature: '错误率', realcap: '< 1%', alternative: '5-15%' },
        { feature: '24/7可用性', realcap: true, alternative: false },
        { feature: '成本效率', realcap: true, alternative: false },
        { feature: '审计追踪', realcap: true, alternative: '人工记录' },
        { feature: '集成就绪', realcap: true, alternative: false },
        { feature: '需要培训', realcap: false, alternative: true },
        { feature: '人为偏见', realcap: false, alternative: true },
      ],
    },
  },
};

export async function generateStaticParams() {
  const params: { locale: string; topic: string }[] = [];

  for (const locale of locales) {
    for (const topic of Object.keys(comparisonData)) {
      params.push({ locale, topic });
    }
  }

  return params;
}

export default async function CompareTopicPage({ params }: CompareTopicPageProps) {
  const { locale, topic } = await params;
  setRequestLocale(locale);

  const topicData = comparisonData[topic]?.[locale];

  if (!topicData) {
    notFound();
  }

  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <Container size="lg" className="py-12">
      <Breadcrumb
        items={[
          { label: locale === 'en' ? 'Home' : '首页', href: `${prefix}/` },
          { label: locale === 'en' ? 'Compare' : '对比', href: `${prefix}/compare` },
          { label: topicData.title, href: `${prefix}/compare/${topic}` },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-6">
        {topicData.title}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {topicData.description}
      </p>

      <CompareTable
        rows={topicData.rows}
        alternativeName={topicData.alternativeName}
      />

      <div className="mt-8 flex gap-4">
        <Link href={`${prefix}/`} variant="button">
          {locale === 'en' ? 'Try RealCap Free' : '免费试用 RealCap'}
        </Link>
        <Link href={`${prefix}/compare`} variant="outline">
          {locale === 'en' ? 'View All Comparisons' : '查看所有对比'}
        </Link>
      </div>
    </Container>
  );
}