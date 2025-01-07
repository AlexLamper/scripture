// i18n.ts

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './i18n.config';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locales.includes(locale as Locale)) {
    return notFound();
  }

  try {
    const messages = (await import(`@/messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return notFound();
  }
});
