import Image from "next/image";

interface IExperienceCard {
  img: string;
  text: string;
}

export default function ExperienceCard({ img, text }: IExperienceCard) {
  return (
    <div className="z-0 flex w-full flex-row items-center justify-center gap-1 rounded-lg bg-primary-variant-1 px-4 py-6 text-sm md:gap-3 md:rounded-none">
      <div className="relative size-[28px] shrink-0 md:size-[40px]">
        <Image
          src={img}
          alt="Card Icon"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <p className="text-center text-[7px] font-bold leading-none text-neutral-400 md:text-start md:text-sm">
        {text}
      </p>
    </div>
  );
}
