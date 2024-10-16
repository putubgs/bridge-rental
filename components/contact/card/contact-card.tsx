import { Button } from "@mui/material";
import Image from "next/image";

interface IContactCard {
  title: string;
  description: string;
  onButtonClick: () => void;
}

export default function ContactCard({
  title,
  description,
  onButtonClick,
}: IContactCard) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded border-2 border-neutral-200/80 p-5">
      <div className="w-fit rounded-sm bg-primary-variant-1 p-2">
        <div className="relative size-7">
          <Image
            src={"/assets/img/call-center-agent-icon.png"}
            alt="Call Center Agent Icon"
            fill
          />
        </div>
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="pb-5 text-sm text-neutral-400">{description}</p>
      <Button
        onClick={onButtonClick}
        variant="contained"
        size="small"
        className="w-fit rounded border !bg-neutral-300 px-4 capitalize text-neutral-500"
      >
        Call us
      </Button>
    </div>
  );
}
