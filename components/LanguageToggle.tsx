"use client";

import { useLanguage } from "@/lib/language";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={lang === "en" ? "is-active" : undefined}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === "ar" ? "is-active" : undefined}
        onClick={() => setLang("ar")}
      >
        AR
      </button>
    </div>
  );
}
