import { create } from "zustand";

type Language = "en" | "ar";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
}));

export default useLanguageStore;
