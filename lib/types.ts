import { ExtrasType } from "./enums";

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
  availability: string;
  doors: number;
  passengers: number;
  luggage: number;
  grab_and_drive: number;
  complete_fee_rate: number;
  packed_to_the_brim: number;
}

export interface IChildrenSeatsQuantity {
  [key: string]: number;
  infant_car_seats: number;
  booster_car_seats: number;
}
