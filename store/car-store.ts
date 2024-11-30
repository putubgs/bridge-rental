import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface CarStore {
  carModels: any[];
  carTypes: string[];
  fetchCars: () => Promise<void>;
  addCar: (car: any) => void;
  updateCar: (updatedCar: any) => void;
}

export const useCarStore = create<CarStore>((set) => ({
  carModels: [],
  carTypes: [],
  fetchCars: async () => {
    try {
      const { data, error } = await supabase
        .from("CarModel")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      const carTypes = Array.from(
        new Set(data?.map((car) => car.car_type).filter(Boolean)),
      );

      set({ carModels: data || [], carTypes });
    } catch (err) {
      console.error("Failed to fetch car data:", err);
    }
  },
  addCar: (newCar) => {
    if (!newCar?.car_type) {
      console.error("Invalid car data: Missing car_type");
      return;
    }

    set((state) => ({
      carModels: [...state.carModels, newCar],
      carTypes: Array.from(
        new Set([...state.carTypes, newCar.car_type].filter(Boolean)),
      ),
    }));
  },
  updateCar: (updatedCar) => {
    if (!updatedCar?.car_type) {
      console.error("Invalid car data: Missing car_type");
      return;
    }

    set((state) => {
      // Update or add the car to carModels
      const existingCarIndex = state.carModels.findIndex(
        (car) => car.car_id === updatedCar.car_id,
      );
      const updatedCarModels = [...state.carModels];

      if (existingCarIndex >= 0) {
        // Update existing car
        updatedCarModels[existingCarIndex] = updatedCar;
      } else {
        // Add new car if not found
        updatedCarModels.push(updatedCar);
      }

      // Update carTypes to include the updated car's type
      const updatedCarTypes = Array.from(
        new Set(updatedCarModels.map((car) => car.car_type).filter(Boolean)),
      );

      return { carModels: updatedCarModels, carTypes: updatedCarTypes };
    });
  },
}));
