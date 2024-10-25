export interface IReview {
  review_id: string;
  customer_name: string;
  customer_location: string;
  car_model_name: string;
  rating: number;
  review_text: string;
  review_date: string;
}

export interface ICarModel {
  car_id: string;
  car_model: string;
  car_type: string;
  car_image: string;
  availability_status: string;
  doors: number;
  passengers_capacity: number;
  luggage_capacity: number;
  grab_and_drive_price_per_day: number;
  complete_fee_rate_price_per_day: number;
  packed_to_the_brim_price_per_day: number;
}