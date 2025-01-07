"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("navbar");

  const changeLanguage = (newLocale: string) => {
    // Update the URL to include the new language
    router.push(`/${newLocale}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 ${locale === "en" ? "text-blue-500" : "text-gray-700"}`}
      >
        {t("home")}
      </button>
      <button
        onClick={() => changeLanguage("nl")}
        className={`px-4 py-2 ${locale === "nl" ? "text-blue-500" : "text-gray-700"}`}
      >
        {t("home")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
