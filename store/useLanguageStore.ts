import { create } from "zustand";

type LanguageStore = {
  language: "en" | "ar";
  setLanguage: (language: "en" | "ar") => void;
};

const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
}));

export default useLanguageStore;
