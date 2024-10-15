import { Rating } from "@mui/material";

interface ITestimonyCard {
  rating: number;
  customer_name: string;
  car_model_name: string;
  review_date: string;
  review_text: string;
}

export default function TestimonyCard({
  rating,
  customer_name,
  review_text,
  review_date,
  car_model_name,
}: ITestimonyCard) {
  return (
    <div className="bg-white p-5 shadow-md">
      <h3 className="text-xl font-semibold">{customer_name}</h3>
      <Rating value={rating} precision={0.5} readOnly />
      <p className="font-semibold">Highly recommend</p>
      <p className="font-light text-neutral-400">{review_text}</p>
      <p className="mt-5 text-sm">
        {car_model_name} - {review_date}
      </p>
    </div>
  );
}
