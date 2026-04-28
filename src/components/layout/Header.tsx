'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { type Locale } from '@/i18n.config';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`${prefix}/`} className="flex items-center gap-2" variant="muted">
            <span className="text-2xl font-bold text-blue-600">R</span>
            <span className="font-semibold">RealCap</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href={`${prefix}/`}>{t('home')}</Link>
            <Link href={`${prefix}/#features`}>{t('features')}</Link>
            <Link href={`${prefix}/blog`}>{t('blog')}</Link>
            <Link href={`${prefix}/docs`}>{t('docs')}</Link>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}