"use client";

import { useState, useEffect } from "react";
import { useCarStore } from "@/store/car-store";
import ImageUploader from "../img-uploder";

interface CarFormProps {
  initialValues: {
    carModel: string;
    carType: string;
    availability: string;
    doors: string;
    passengers: string;
    luggage: string;
    grabAndDrive: string;
    completeFeeRate: string;
    packedToTheBrim: string;
    vehicleImage?: string | File | null;
  };
  onSubmit: (formData: CarFormProps["initialValues"]) => void;
}

export default function CarForm({ initialValues, onSubmit }: CarFormProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const { carTypes } = useCarStore();

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    if (showSuggestions) {
      setFilteredSuggestions(
        carTypes.filter((type) =>
          type.toLowerCase().includes(formValues.carType.toLowerCase()),
        ),
      );
    }
  }, [formValues.carType, carTypes, showSuggestions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (file: File | null) => {
    setFormValues((prev) => ({ ...prev, vehicleImage: file }));
    if (file) {
      setErrors((prev) => ({ ...prev, vehicleImage: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};

    Object.keys(formValues).forEach((key) => {
      if (
        !formValues[key as keyof typeof formValues] &&
        key !== "vehicleImage"
      ) {
        validationErrors[key] = "This field is required";
      }
    });

    if (!formValues.vehicleImage) {
      validationErrors.vehicleImage = "Vehicle image is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formValues);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormValues((prev) => ({ ...prev, carType: suggestion }));
    setShowSuggestions(false);
  };

  const getInputValue = (value: any): string | number | undefined => {
    if (value === null || value === undefined) return "";
    return value;
  };

  return (
    <form className="relative flex w-full gap-6" onSubmit={handleSubmit}>
      {/* Car Info - 40% */}
      <div className="flex w-[40%] flex-col gap-4">
        <p className="text-[20px]">Car Info</p>
        <div className="relative grid w-full grid-cols-10 gap-2">
          <div className="col-span-6 flex flex-col gap-2">
            <div>
              <input
                type="text"
                name="carModel"
                className={`w-full rounded-md border px-5 py-3 text-sm text-gray-800 outline-none ${
                  errors.carModel ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Car Model : "
                value={getInputValue(formValues.carModel)}
                onChange={handleChange}
              />
              {errors.carModel && (
                <p className="mt-1 text-xs text-red-500">{errors.carModel}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="carType"
                className={`w-full rounded-md border px-5 py-3 text-sm text-gray-800 outline-none ${
                  errors.carType ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Car Type"
                value={formValues.carType}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                autoComplete="off"
              />
              {errors.carType && (
                <p className="mt-1 text-xs text-red-500">{errors.carType}</p>
              )}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 max-h-48 w-[70%] overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md">
                  {filteredSuggestions.map((type, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(type)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-full">
              <select
                name="availability"
                className={`w-full appearance-none rounded-md border bg-white px-5 py-3 text-sm text-gray-800 outline-none ${
                  errors.availability ? "border-red-500" : "border-gray-300"
                }`}
                value={formValues.availability}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {errors.availability && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.availability}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-2">
            {["doors", "passengers", "luggage"].map((field) => (
              <div key={field}>
                <input
                  type="number"
                  name={field}
                  className={`w-full rounded-md border px-5 py-3 text-sm text-gray-800 outline-none ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} : `}
                  value={getInputValue(
                    formValues[field as keyof typeof formValues],
                  )}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bundle Rates - 25% */}
      <div className="flex w-[25%] flex-col gap-4">
        <p className="text-[20px]">Bundle Rates</p>
        <div className="flex w-full flex-col gap-2">
          {["grabAndDrive", "completeFeeRate", "packedToTheBrim"].map(
            (field) => (
              <div key={field}>
                <input
                  type="number"
                  name={field}
                  className={`w-full rounded-md border px-5 py-3 text-sm text-gray-800 outline-none ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={`${field.split(/(?=[A-Z])/).join(" ")} : `}
                  value={getInputValue(
                    formValues[field as keyof typeof formValues],
                  )}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
                )}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Image Uploader */}
      <div className="flex h-full w-[35%] flex-col gap-4">
        <p className="text-[20px]">Vehicle Image</p>
        <ImageUploader
          error={errors.vehicleImage}
          onFileChange={handleImageChange}
          initialImage={formValues.vehicleImage as string}
        />
      </div>

      {/* Save Button */}
      <div className="flex w-[5%] items-center justify-center">
        <button
          type="submit"
          className="w-full rounded-md bg-[#5E8EFF] p-3 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
