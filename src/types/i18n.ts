import type { Locale } from '@/i18n.config';

export { Locale };

export interface LocaleConfig {
  code: Locale;
  name: string;
  prefix: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  locale: Locale;
}

export interface Translations {
  metadata: {
    title: string;
    description: string;
  };
  nav: Record<string, string>;
  hero: Record<string, string>;
  footer: Record<string, string>;
}