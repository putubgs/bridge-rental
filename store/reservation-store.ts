// store/reservation-store.ts

import { create } from "zustand";
import {
  BundleType,
  ChildrenExtrasType,
  ExtrasType,
  ProtectionType,
} from "@/lib/enums";
import { IChildrenSeatsQuantity } from "@/lib/types";
import { Dayjs } from "dayjs";

// Define the AdditionalOffer interface directly within the store file
export interface AdditionalOffer {
  id: string;
  type: "Protection" | "Extras";
  offer_name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  availability: boolean;
}

// Define the initial state separately for easy resetting
const rentDetailsInitialState = {
  car_id: "",
  customer_firstname: "",
  customer_lastname: "",
  customer_email: "",
  customer_dob: null as Dayjs | null,
  customer_phone_number: "",
  customer_document: "",
  deliveryLocation: "",
  returnLocation: "",
  deliveryDate: null as Dayjs | null,
  deliveryTime: null as Dayjs | null,
  returnDate: null as Dayjs | null,
  returnTime: null as Dayjs | null,
  selected_bundle: null as BundleType | null,
  totalBundlePrice: 0,
  rent_status: "",
  selected_protection: ProtectionType.protection1,
  totalProtectionPrice: 0,
  selected_extras: [] as ExtrasType[],
  selected_children_extras: [] as ChildrenExtrasType[],
  totalExtrasPrice: 0,
  childrenSeatsQuantity: {
    infant_car_seats: 1,
    booster_car_seats: 1,
  } as IChildrenSeatsQuantity,
  extras: [] as AdditionalOffer[],
  childrenExtras: [] as AdditionalOffer[],
};

// Define the RentDetailsState interface
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

  // Action Methods
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
  resetRentDetails: () => void;
}

// Define the CarSearchState interface
interface CarSearchState {
  searchCompleted: boolean;
  setSearchCompleted: (completed: boolean) => void;
}

// Create the useCarSearchStore
export const useCarSearchStore = create<CarSearchState>((set) => ({
  searchCompleted: false,
  setSearchCompleted: (completed) =>
    set(() => ({ searchCompleted: completed })),
}));

// Create the useRentDetailsStore with a reset function
export const useRentDetailsStore = create<RentDetailsState>((set) => ({
  // Initialize state from rentDetailsInitialState
  ...rentDetailsInitialState,

  // Define action methods
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
  setChildrenExtras: (childrenExtras) =>
    set({ childrenExtras: childrenExtras }),

  // Implement the reset function
  resetRentDetails: () => set({ ...rentDetailsInitialState }),
}));
