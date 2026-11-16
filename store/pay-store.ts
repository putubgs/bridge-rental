import { Dayjs } from "dayjs";
import { create } from "zustand";

export interface PaymentFormValues {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  dateOfBirth: Dayjs | null;
  phoneNumber: string;
  idDocument: string;
  drivingLicense: string;
  agreement: boolean;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingCountry: string;
  billingPostcode: string;
  paymentMethod: PaymentMethod;
}

export interface PaymentData extends PaymentFormValues {
  cardLast4: string;
  cardExpiry: string;
  paymentReference: string;
}

export interface PendingCheckout {
  checkoutId: string;
  merchantTransactionId: string;
  amount: string;
}

export interface PaymentReturn {
  resourcePath: string;
  checkout: PendingCheckout;
  formValues: PaymentFormValues;
}

export enum PaymentMethod {
  PAYNOW = "PAY NOW",
  PAYLATER = "PAY LATER",
}

interface PayStore {
  paymentData: PaymentData | null;
  paymentReturn: PaymentReturn | null;
  savePayment: (data: PaymentData) => void;
  resetPayment: () => void;
  setPaymentReturn: (paymentReturn: PaymentReturn | null) => void;
}

export const usePayStore = create<PayStore>((set) => ({
  paymentData: null,
  paymentReturn: null,

  savePayment: (data) => set({ paymentData: data }),

  resetPayment: () => set({ paymentData: null }),

  setPaymentReturn: (paymentReturn) => set({ paymentReturn }),
}));
