'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { type Locale } from '@/i18n.config';

interface PricingCardProps {
  tier: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export function PricingCard({ tier, name, price, features, highlighted }: PricingCardProps) {
  const locale = useLocale() as Locale;

  return (
    <div className={`bg-white rounded-lg p-8 shadow-sm border ${highlighted ? 'border-blue-600 ring-2 ring-blue-600' : 'border-gray-200'}`}>
      {highlighted && (
        <div className="text-sm font-medium text-blue-600 mb-4">
          {locale === 'en' ? 'Most Popular' : '最受欢迎'}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-4">{price}</div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant={highlighted ? 'primary' : 'outline'} className="w-full">
        {locale === 'en' ? 'Get Started' : '开始使用'}
      </Button>
    </div>
  );
}