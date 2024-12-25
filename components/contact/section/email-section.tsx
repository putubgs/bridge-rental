import Image from "next/image";
import EmailForm from "../form/email-form";

export default function EmailSection() {
  return (
    <section className="flex flex-col items-center justify-between gap-5 md:flex-row md:items-end">
      <div className="w-full space-y-3 md:basis-1/2">
        <h2 className="text-sm text-neutral-500 md:text-xl">
          <span className="font-semibold">We Value our Customers</span> Your
          thoughts matter.
        </h2>
        <EmailForm />
        <p className="pt-2 text-[10px] text-neutral-500 md:text-xs">
          *Please refer to our Privacy for more details.
        </p>
      </div>
      <div className="relative hidden h-[200px] w-full md:block md:w-[416px]">
        <Image
          src={"/assets/img/black-suv.png"}
          alt="Black SUV Illustration"
          fill
          sizes="(max-width: 768px) 90vw, 100vw"
        />
      </div>
    </section>
  );
}
