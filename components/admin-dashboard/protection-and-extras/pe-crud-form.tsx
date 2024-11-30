"use client";

import { useState, useEffect } from "react";
import ImageUploader from "../img-uploder";

interface ProtectionExtraFormProps {
  initialValues: {
    offerDetail: string;
    price: string;
    type: string;
    availability: string;
    description: string;
    vehicleImage?: string | File | null;
  };
  onSubmit: (formData: ProtectionExtraFormProps["initialValues"]) => void;
}

export default function ProtectionExtraForm({
  initialValues,
  onSubmit,
}: ProtectionExtraFormProps) {
  const [formValues, setFormValues] = useState({
    ...initialValues,
    type: initialValues.type || "Protection",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormValues({
      ...initialValues,
      type: initialValues.type || "Protection",
    });
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
        description: "",
        vehicleImage:
          value === "Extras (Baby Seats)" ? null : prev.vehicleImage,
      }));
    } else if (name === "description" && formValues.type === "Protection") {
      const lines = value.split("\n");
      const formattedLines = lines.map((line, index) => {
        if (line.trim() === "" && index === lines.length - 1) {
          return "";
        }
        if (line.trim() === "-" && index === lines.length - 1) {
          return "";
        }
        return line.startsWith("- ") || line.trim() === "" ? line : `- ${line}`;
      });

      const filteredLines = formattedLines.filter((line, index) => {
        return line.trim() !== "" || index === formattedLines.length - 1;
      });

      setFormValues((prev) => ({
        ...prev,
        [name]: filteredLines.join("\n"),
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }

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

    if (!formValues.offerDetail)
      validationErrors.offerDetail = "This field is required";
    if (!formValues.price) validationErrors.price = "This field is required";
    if (!formValues.description && !isExtrasBabySeats)
      validationErrors.description = "This field is required";

    if (!formValues.vehicleImage && !isExtrasBabySeats) {
      validationErrors.vehicleImage = "Vehicle image is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation Errors:", validationErrors);
      return;
    }

    const formData = {
      ...formValues,
      type: formValues.type === "Extras (Baby Seats)" ? "Extras" : formValues.type,
    };

    console.log("Form Submitted:", formData);
    onSubmit(formData);
  };

  const isExtrasBabySeats = formValues.type === "Extras (Baby Seats)";

  return (
    <form className="relative flex w-full gap-6" onSubmit={handleSubmit}>
      {/* Image Uploader */}
      <div className="flex h-full w-[20%] flex-col gap-4">
        <p className="text-[20px]">Icon Image</p>
        <div className="relative h-full">
          <ImageUploader
            error={isExtrasBabySeats ? undefined : errors.vehicleImage}
            onFileChange={handleImageChange}
            initialImage={
              isExtrasBabySeats
                ? null
                : (formValues.vehicleImage as string | null)
            }
          />
          {isExtrasBabySeats && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70 text-gray-500">
              <p className="text-sm font-medium">Not Required</p>
            </div>
          )}
        </div>
      </div>

      {/* Offer Info */}
      <div className="flex w-[35%] flex-col gap-4">
        <p className="text-[20px]">Offer Info</p>
        <div className="relative grid w-full gap-2">
          <div>
            <input
              type="text"
              name="offerDetail"
              className={`w-full rounded-md border px-5 py-3 text-sm text-gray-800 outline-none ${
                errors.offerDetail ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Offer Detail : "
              value={formValues.offerDetail}
              onChange={handleChange}
            />
            {errors.offerDetail && (
              <p className="mt-1 text-xs text-red-500">{errors.offerDetail}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              name="price"
              className={`w-full rounded-md border px-5 py-3 text-sm text-gray-800 outline-none ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Price : "
              value={formValues.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">{errors.price}</p>
            )}
          </div>

          <div className="relative w-full">
            <select
              name="type"
              className={`w-full appearance-none rounded-md border bg-white px-5 py-3 text-sm text-gray-800 outline-none ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
              value={formValues.type}
              onChange={handleChange}
            >
              <option value="Protection">Protection</option>
              <option value="Extras">Extras</option>
              <option value="Extras (Baby Seats)">Extras (Baby Seats)</option>
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
            {errors.type && (
              <p className="mt-1 text-xs text-red-500">{errors.type}</p>
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
              <p className="mt-1 text-xs text-red-500">{errors.availability}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex h-full w-[40%] flex-col justify-center gap-4">
        <p className="text-[20px]">Details</p>
        <div className="relative h-full">
          <textarea
            name="description"
            className={`h-full w-full resize-none rounded-md border p-3 outline-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            value={formValues.description}
            onChange={handleChange}
            placeholder="Enter details..."
            disabled={isExtrasBabySeats}
          ></textarea>
          {isExtrasBabySeats && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70 text-gray-500">
              <p className="text-sm font-medium">Not Required</p>
            </div>
          )}
        </div>
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Save Button */}
      <div className="flex w-[5%] items-center justify-center pt-10">
        <button
          type="submit"
          className="w-full resize-none rounded-md bg-[#5E8EFF] p-3 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}
