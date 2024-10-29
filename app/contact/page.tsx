import ContactsSection from "@/components/contact/section/contacts-section";
import EmailSection from "@/components/contact/section/email-section";

export default function ContactPage() {
  return (
    <div className="bg-[#F9F9F9] relative -top-20">
      <main className="mx-auto max-w-screen-2xl space-y-12 p-20 pt-32">
        <ContactsSection />
        <EmailSection />
      </main>
    </div>
  );
}
