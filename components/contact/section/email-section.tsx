import Image from "next/image";
import EmailForm from "../form/email-form";

export default function EmailSection() {
  return (
    <section className="flex items-end justify-between gap-5">
      <div className="basis-1/2 space-y-3">
        <h2 className="text-xl text-neutral-500">
          <span className="font-semibold">We Value our Customers</span> Your
          thoughts matter.
        </h2>
        <EmailForm />
        <p className="pt-2 text-xs text-neutral-500">
          *Please refer to our Privacy for more details.
        </p>
      </div>
      <div className="relative h-[200px] w-[416px]">
        <Image
          src={"/assets/img/black-suv.png"}
          alt="Black SUV Illustration"
          fill
        />
      </div>
    </section>
  );
}
