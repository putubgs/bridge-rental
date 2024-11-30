import {
  BundleType,
  ChildrenExtrasType,
  ExtrasType,
  ProtectionType,
} from "@/lib/enums";
import { IChildrenSeatsQuantity } from "@/lib/types";
import { Dayjs } from "dayjs";
import { create } from "zustand";

interface CarSearchState {
  searchCompleted: boolean;
  setSearchCompleted: (completed: boolean) => void;
}

interface AdditionalOffer {
  id: string;
  type: "Protection" | "Extras";
  offer_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  availability: boolean;
}

interface RentDetailsState {
  car_id: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  customer_dob: Dayjs | null;
  customer_phone_number: string;
  customer_document: string;
  deliveryLocation: string;
  returnLocation: string;
  deliveryDate: Dayjs | null;
  deliveryTime: Dayjs | null;
  returnDate: Dayjs | null;
  returnTime: Dayjs | null;
  selected_bundle: BundleType | null;
  totalBundlePrice: number;
  rent_status: string;
  selected_protection: ProtectionType | null;
  totalProtectionPrice: number;
  selected_extras: ExtrasType[];
  selected_children_extras: ChildrenExtrasType[];
  totalExtrasPrice: number;
  childrenSeatsQuantity: IChildrenSeatsQuantity;
  extras: AdditionalOffer[];
  childrenExtras: AdditionalOffer[];

  setCarId: (id: string) => void;
  setCustomerFirstname: (firstname: string) => void;
  setCustomerLastname: (lastname: string) => void;
  setCustomerEmail: (email: string) => void;
  setCustomerDob: (dob: Dayjs | null) => void;
  setCustomerPhoneNumber: (phoneNumber: string) => void;
  setCustomerDocument: (document: string) => void;
  setDeliveryLocation: (location: string) => void;
  setReturnLocation: (location: string) => void;
  setDeliveryDate: (date: Dayjs | null) => void;
  setDeliveryTime: (time: Dayjs | null) => void;
  setReturnDate: (date: Dayjs | null) => void;
  setReturnTime: (time: Dayjs | null) => void;
  setSelectedBundle: (bundle: BundleType | null) => void;
  setTotalBundlePrice: (price: number) => void;
  setRentStatus: (status: string) => void;
  setSelectedProtection: (protection: ProtectionType) => void;
  setTotalProtectionPrice: (price: number) => void;
  setSelectedExtras: (extras: ExtrasType[]) => void;
  setTotalExtrasPrice: (price: number) => void;
  setSelectedChildrenExtras: (extras: ChildrenExtrasType[]) => void;
  setChildrenSeatsQuantity: (extras: IChildrenSeatsQuantity) => void;
  setExtras: (extras: AdditionalOffer[]) => void;
  setChildrenExtras: (childrenExtras: AdditionalOffer[]) => void;
}

export const useCarSearchStore = create<CarSearchState>((set) => ({
  searchCompleted: false,
  setSearchCompleted: (completed) =>
    set(() => ({ searchCompleted: completed })),
}));

export const useRentDetailsStore = create<RentDetailsState>((set) => ({
  car_id: "",
  customer_firstname: "",
  customer_lastname: "",
  customer_email: "",
  customer_dob: null,
  customer_phone_number: "",
  customer_document: "",
  deliveryLocation: "",
  returnLocation: "",
  deliveryDate: null,
  deliveryTime: null,
  returnDate: null,
  returnTime: null,
  selected_bundle: null,
  totalBundlePrice: 0,
  rent_status: "",
  selected_protection: ProtectionType.protection1,
  totalProtectionPrice: 0,
  selected_extras: [],
  selected_children_extras: [],
  totalExtrasPrice: 0,
  childrenSeatsQuantity: {
    infant_car_seats: 1,
    booster_car_seats: 1,
  },
  extras: [],
  childrenExtras: [],

  setCarId: (id) => set({ car_id: id }),
  setCustomerFirstname: (firstname) => set({ customer_firstname: firstname }),
  setCustomerLastname: (lastname) => set({ customer_lastname: lastname }),
  setCustomerEmail: (email) => set({ customer_email: email }),
  setCustomerDob: (dob) => set({ customer_dob: dob }),
  setCustomerPhoneNumber: (phoneNumber) =>
    set({ customer_phone_number: phoneNumber }),
  setCustomerDocument: (document) => set({ customer_document: document }),
  setDeliveryLocation: (location) => set({ deliveryLocation: location }),
  setReturnLocation: (location) => set({ returnLocation: location }),
  setDeliveryDate: (date) => set({ deliveryDate: date }),
  setDeliveryTime: (time) => set({ deliveryTime: time }),
  setReturnDate: (date) => set({ returnDate: date }),
  setReturnTime: (time) => set({ returnTime: time }),
  setSelectedBundle: (bundle) => set({ selected_bundle: bundle }),
  setTotalBundlePrice: (price) => set({ totalBundlePrice: price }),
  setRentStatus: (status) => set({ rent_status: status }),
  setSelectedProtection: (protection) =>
    set({ selected_protection: protection }),
  setTotalProtectionPrice: (price) => set({ totalProtectionPrice: price }),
  setSelectedExtras: (extras) => set({ selected_extras: extras }),
  setSelectedChildrenExtras: (extras) =>
    set({ selected_children_extras: extras }),
  setTotalExtrasPrice: (price) => set({ totalExtrasPrice: price }),
  setChildrenSeatsQuantity: (extras) => set({ childrenSeatsQuantity: extras }),
  setExtras: (extras) => set({ extras }),
  setChildrenExtras: (childrenExtras) => set({ childrenExtras }),
}));
