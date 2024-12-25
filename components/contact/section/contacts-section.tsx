"use client";

import ContactCard from "../card/contact-card";

export default function ContactsSection() {
  return (
    <section>
      <h2 className="md:text-2xl text-[20px] font-semibold">Get in touch with us</h2>

      <div className="mt-2 grid grid-cols-1 gap-3 border-y-2 border-neutral-200/80 md:py-12 py-6 md:grid-cols-3">
        <ContactCard
          title="Telephone Bookings"
          description="Prefer to make a booking over the phone? No problem! Call us, and we'll get everything arranged for you."
          onButtonClick={() => {}}
        />
        <ContactCard
          title="Customer Service"
          description="Prefer to make a booking over the phone? No problem! Call us, and we'll get everything arranged for you."
          onButtonClick={() => {}}
        />
        <ContactCard
          title="Roadside Assistance"
          description="If you're experiencing an issue on the road, our dedicated roadside assistance team is here 24/7 to help you get back on track."
          onButtonClick={() => {}}
        />
      </div>
    </section>
  );
}
