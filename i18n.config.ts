export const locales = ['en', 'nl'] as const;
export type Locale = (typeof locales)[number];

export const messages = {
  'en': () => import('@/messages/en.json'),
  'nl': () => import('@/messages/nl.json'),
};
