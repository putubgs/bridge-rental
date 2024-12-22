import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export default function InfoSection() {
  return (
    <div className="flex w-full items-center gap-4 border border-[#EBEBEB] bg-white p-5 md:text-[15px] text-[9px]">
      <InfoRoundedIcon style={{ color: "#8BD6D6", fontSize: 35 }} />
      <p>
        <span className="font-bold">
          Remember that each category includes several car models.
        </span>{" "}
        We can guarantee car availability within the booked category and, once
        upon arrival, we will provide you with the model that is available at
        that time.
      </p>
    </div>
  );
}
