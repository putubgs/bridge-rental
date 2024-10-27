import { create } from "zustand";
import { Dayjs } from "dayjs";
import { BundleType } from "@/lib/enums";

interface CarSearchState {
  searchCompleted: boolean;
  setSearchCompleted: (completed: boolean) => void;
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
}));
