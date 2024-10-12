import Image from "next/image";

interface IExperienceCard {
  img: string;
  text: string;
}

export default function ExperienceCard({ img, text }: IExperienceCard) {
  return (
    <div className="flex w-full items-center justify-center gap-3 bg-primary-variant-1 px-4 py-6 text-sm">
      <div className="relative size-[40px] shrink-0">
        <Image src={img} alt="Card Icon" fill />
      </div>
      <p className="font-bold leading-none text-neutral-400">{text}</p>
    </div>
  );
}
