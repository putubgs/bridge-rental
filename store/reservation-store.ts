import { create } from 'zustand';
import { Dayjs } from 'dayjs';

interface CarSearchState {
  deliveryLocation: string;
  returnLocation: string;
  deliveryDate: Dayjs | null;
  deliveryTime: Dayjs | null;
  returnDate: Dayjs | null;
  returnTime: Dayjs | null;
  setDeliveryLocation: (location: string) => void;
  setReturnLocation: (location: string) => void;
  setDeliveryDate: (date: Dayjs) => void;
  setDeliveryTime: (time: Dayjs) => void;
  setReturnDate: (date: Dayjs) => void;
  setReturnTime: (time: Dayjs) => void;
  searchCompleted: boolean;
  setSearchCompleted: (completed: boolean) => void;
}

export const useCarSearchStore = create<CarSearchState>((set) => ({
  deliveryLocation: '',
  returnLocation: '',
  deliveryDate: null,
  deliveryTime: null,
  returnDate: null,
  returnTime: null,
  searchCompleted: false,
  
  setDeliveryLocation: (location) => set({ deliveryLocation: location }),
  setReturnLocation: (location) => set({ returnLocation: location }),
  setDeliveryDate: (date) => set({ deliveryDate: date }),
  setDeliveryTime: (time) => set({ deliveryTime: time }),
  setReturnDate: (date) => set({ returnDate: date }),
  setReturnTime: (time) => set({ returnTime: time }),
  setSearchCompleted: (completed) => set(() => ({ searchCompleted: completed })),
}));