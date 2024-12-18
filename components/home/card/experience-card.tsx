import Image from "next/image";

interface IExperienceCard {
  img: string;
  text: string;
}

export default function ExperienceCard({ img, text }: IExperienceCard) {
  return (
    <div className="z-0 flex flex-col md:flex-row w-full items-center justify-center gap-3 bg-primary-variant-1 px-4 py-6 text-sm">
      <div className="relative size-[40px] shrink-0">
        <Image
          src={img}
          alt="Card Icon"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <p className="font-bold leading-none text-neutral-400 text-center md:text-start">
        {text}
      </p>
    </div>
  );
}
