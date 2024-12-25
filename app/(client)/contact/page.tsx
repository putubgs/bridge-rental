"use client";

import ContactsSection from "@/components/contact/section/contacts-section";
import EmailSection from "@/components/contact/section/email-section";
import useLanguageStore from "@/store/useLanguageStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function ContactPage() {
  const { language } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time for language change
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [language]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative -top-5 bg-[#F9F9F9] md:-top-20">
      <main className="mx-auto max-w-screen-2xl space-y-8 p-4 pt-10 md:space-y-12 md:p-20 md:pt-24 md:pt-32">
        <ContactsSection />
        <EmailSection />
      </main>
    </div>
  );
}
