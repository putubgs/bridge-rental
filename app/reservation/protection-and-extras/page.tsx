import ExtrasSection from "@/components/reservation/protection-and-extras/section/extras-section";
import ProtectionsSection from "@/components/reservation/protection-and-extras/section/protections-section";
import { Button } from "@mui/material";

export default function ProtectionAndExtras() {
  return (
    <main>
      <div className="mt-10 space-y-10 bg-white px-20 py-7">
        <ProtectionsSection />
        <ExtrasSection />
      </div>
      <section className="flex justify-center gap-6 bg-primary-variant-1 py-11">
        <button className="text-neutral-400">Back to car bundle</button>
        <Button
          variant="contained"
          className="!rounded !bg-primary-variant-2 !px-7 !font-overpass !capitalize !text-white"
        >
          Continue
        </Button>
      </section>
    </main>
  );
}
