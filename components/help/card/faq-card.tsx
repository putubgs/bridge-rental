import Image from "next/image";

interface IFaqCard {
  question: string;
  answer: string;
}

export default function FaqCard({ question, answer }: IFaqCard) {
  return (
    <div className="space-y-3 rounded border-2 border-neutral-200/80 bg-white p-5">
      <div className="w-fit rounded-sm bg-primary-variant-1 p-2">
        <div className="relative size-7">
          <Image
            src={"/assets/img/call-center-agent-icon.png"}
            alt="Call Center Agent Icon"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      <h3 className="font-semibold">{question}</h3>
      <p className="text-sm text-neutral-400">{answer}</p>
    </div>
  );
}
