import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};

// Required for next-intl plugin in next.config.js
export default defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});