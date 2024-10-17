"use client";

import ContactCard from "../card/contact-card";

export default function ContactsSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Get in touch with us</h2>

      <div className="mt-2 grid grid-cols-3 gap-3 border-y-2 border-neutral-200/80 py-12">
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
