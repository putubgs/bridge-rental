import { create } from "zustand";

interface TranslationStore {
  carTypeTranslations: Record<string, string>;
  setCarTypeTranslations: (translations: Record<string, string>) => void;
}

const useTranslationStore = create<TranslationStore>((set) => ({
  carTypeTranslations: {},
  setCarTypeTranslations: (translations) =>
    set({ carTypeTranslations: translations }),
}));

export default useTranslationStore;
