import { type Industry } from '@/types/content';

export interface IndustryInfo {
  slug: Industry;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  icon: string;
}

export const industries: IndustryInfo[] = [
  {
    slug: 'lending',
    nameEn: 'Lending Platforms',
    nameZh: '网贷平台',
    descriptionEn: 'Verify borrower financial documents to prevent fraud and reduce default rates',
    descriptionZh: '验证借款人财务文件，防止欺诈并降低违约率',
    icon: '💰',
  },
  {
    slug: 'mcn',
    nameEn: 'MCN Agencies',
    nameZh: 'MCN机构',
    descriptionEn: 'Validate influencer income claims before signing contracts',
    descriptionZh: '签约前验证网红收入声明',
    icon: '📱',
  },
  {
    slug: 'matchmaking',
    nameEn: 'Dating Platforms',
    nameZh: '相亲平台',
    descriptionEn: 'Verify user identity and financial claims for safer dating',
    descriptionZh: '验证用户身份和财务声明，保障安全相亲',
    icon: '💕',
  },
  {
    slug: 'gaming',
    nameEn: 'Gaming Trading',
    nameZh: '游戏交易',
    descriptionEn: 'Verify in-game asset ownership and transaction screenshots',
    descriptionZh: '验证游戏资产所有权和交易截图',
    icon: '🎮',
  },
  {
    slug: 'rental',
    nameEn: 'Rental Agencies',
    nameZh: '租房中介',
    descriptionEn: 'Verify tenant financial documents and identity proofs',
    descriptionZh: '验证租户财务文件和身份证明',
    icon: '🏠',
  },
];

export function getIndustryInfo(slug: Industry): IndustryInfo | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getIndustryName(slug: Industry, locale: string): string {
  const info = getIndustryInfo(slug);
  return locale === 'en' ? info?.nameEn ?? '' : info?.nameZh ?? '';
}