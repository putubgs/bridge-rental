import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:gap-12 gap-3 pt-1">
      <h1 className="text-[20px] text-black">Choose your vehicle</h1>
      <div className="relative h-[40vw] max-h-[600px] min-h-[100px] w-full">
        <Image
          src="/assets/img/reservation-page-banner.png"
          alt="Reservation Banner"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex hidden flex-col gap-5 md:block">
        <h1 className="text-[24px] font-semibold">Choose your vehicle</h1>
        <p>
          Our fleet is ready to roll with rides to match your vibe! Whether
          you’re cruising in the light and cozy ECONOMY, zipping around in the
          small but mighty COMPACT, ruling the road in the sleek SUV or rolling
          deep in the spacious FAMILY MPV, we’ve got the perfect match for your
          journey. Check availability at your next stop by booking now!
        </p>
      </div>
    </section>
  );
}
