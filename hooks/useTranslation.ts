import { useState, useEffect } from "react";
import { translateToArabic, translateMultipleToArabic } from "@/lib/translate";
import useLanguageStore from "@/store/useLanguageStore";

export function useTranslation() {
  const { language } = useLanguageStore();
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const translate = async (text: string | string[]) => {
    if (language === "en") return Array.isArray(text) ? {} : text;

    setIsLoading(true);
    try {
      if (Array.isArray(text)) {
        const newTranslations = await translateMultipleToArabic(text);
        setTranslations((prev) => ({ ...prev, ...newTranslations }));
        return newTranslations;
      } else {
        const translated = await translateToArabic(text);
        setTranslations((prev) => ({ ...prev, [text]: translated }));
        return translated;
      }
    } catch (error) {
      console.error("Translation error:", error);
      return Array.isArray(text) ? {} : text;
    } finally {
      setIsLoading(false);
    }
  };

  return { translate, translations, isLoading };
}
