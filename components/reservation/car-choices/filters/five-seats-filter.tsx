import Toggle from "@/components/shared/toggle/toggle";

interface FiveSeatsFilterProps {
  showMoreThanFiveSeats: boolean;
  setShowMoreThanFiveSeats: (state: boolean) => void;
}

export default function FiveSeatsFilter({
  showMoreThanFiveSeats,
  setShowMoreThanFiveSeats,
}: FiveSeatsFilterProps) {
  return (
    <div
      style={{ flexBasis: "75%" }}
      className="flex items-center gap-3 px-5 py-5 text-[#B2B2B2]"
    >
      <Toggle
        size="30px"
        onColor="#BAF0E2"
        offColor="#ddd"
        handleColor="#fff"
        onToggle={() => setShowMoreThanFiveSeats(!showMoreThanFiveSeats)}
      />
      <p className="text-[14px]">MORE THAN 5 SEATS</p>
    </div>
  );
}
