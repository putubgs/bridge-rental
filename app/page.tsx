import BestDealSection from "@/components/home/section/best-deal-section";
import BookingSection from "@/components/home/section/booking-section";
import ExperienceSection from "@/components/home/section/experience-section";
import HeroSection from "@/components/home/section/hero-section";
import TestimoniesSection from "@/components/home/section/testimonies-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ExperienceSection />
      <BookingSection />
      <BestDealSection />
      <TestimoniesSection />
    </main>
  );
}
