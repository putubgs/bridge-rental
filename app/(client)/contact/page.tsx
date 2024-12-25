import ContactsSection from "@/components/contact/section/contacts-section";
import EmailSection from "@/components/contact/section/email-section";

export default function ContactPage() {
  return (
    <div className="relative md:-top-20 -top-5 bg-[#F9F9F9]">
      <main className="mx-auto max-w-screen-2xl space-y-8 p-4 md:pt-24 pt-10 md:space-y-12 md:p-20 md:pt-32">
        <ContactsSection />
        <EmailSection />
      </main>
    </div>
  );
}
