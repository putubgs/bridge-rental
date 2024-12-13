import { Dayjs } from "dayjs";
import { create } from "zustand";

interface PaymentData {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  dateOfBirth: Dayjs | null;
  phoneNumber: string;
  idDocument: string;
  agreement: boolean;
  cardNumber: string;
  expiryDate: Dayjs | null;
  cvv: string;
  paymentMethod: PaymentMethod;
}

export enum PaymentMethod {
    PAYNOW = "PAY NOW",
    PAYLATER = "PAY LATER",
}

interface PayStore {
  paymentData: PaymentData | null;
  savePayment: (data: PaymentData) => void;
  resetPayment: () => void;
}

export const usePayStore = create<PayStore>((set) => ({
  paymentData: null,

  savePayment: (data: PaymentData) =>{
    set({
      paymentData: data,
    })
    console.log("cek", data, "cek")
},

  resetPayment: () =>
    set({
      paymentData: null,
    }),
}));
