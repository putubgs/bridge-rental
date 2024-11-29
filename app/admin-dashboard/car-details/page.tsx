"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle, Cancel, Edit, Delete } from "@mui/icons-material";
import { createClient } from "@/utils/supabase/client";
import { useCarStore } from "@/store/car-store";

const supabase = createClient();

export default function CarDetails() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const rowsPerPage = 10;

  const { carModels, fetchCars } = useCarStore();

  useEffect(() => {
    if (carModels.length === 0) {
      fetchCars();
    }
  }, [carModels, fetchCars]);

  const totalPages = Math.ceil(carModels.length / rowsPerPage);

  const currentData = carModels.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleEdit = (id: string): void => {
    router.push(`/admin-dashboard/car-details/${id}`);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const { data: carData, error: fetchError } = await supabase
        .from("CarModel")
        .select("car_image")
        .eq("car_id", id)
        .single();

      if (fetchError) throw fetchError;

      if (carData?.car_image) {
        const encodedImagePath = carData.car_image.split("car-images/")[1];
        const imagePath = decodeURIComponent(encodedImagePath);

        if (imagePath) {
          const { error: deleteError } = await supabase.storage
            .from("car-images")
            .remove([imagePath]);

          if (deleteError) {
            console.error("Error deleting image from storage:", deleteError);
          } else {
            console.log("Image deleted successfully from storage.");
          }
        }
      }

      const { error: deleteRecordError } = await supabase
        .from("CarModel")
        .delete()
        .eq("car_id", id);

      if (deleteRecordError) throw deleteRecordError;

      await fetchCars();

      if (currentPage > Math.ceil(carModels.length / rowsPerPage)) {
        setCurrentPage(1);
      }

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleDeleteButtonClick = (id: string): void => {
    setSelectedCarId(id);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = (): void => {
    setSelectedCarId(null);
    setShowDeleteModal(false);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="flex items-center justify-between">
        <div className="text-[24px]">Car Prices and Info Settings</div>
        <div
          className="cursor-pointer rounded-md bg-[#5E8EFF] px-3 py-2 text-white"
          onClick={() =>
            router.push("/admin-dashboard/car-details/add-new-car")
          }
        >
          + Add New Car
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="border-b bg-white text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3"></th>
              <th scope="col" className="px-6 py-3">
                CAR MODEL
              </th>
              <th scope="col" className="px-6 py-3">
                CAR TYPE
              </th>
              <th scope="col" className="px-6 py-3">
                GRAB AND DRIVE
              </th>
              <th scope="col" className="px-6 py-3">
                COMPLETE FEE RATE
              </th>
              <th scope="col" className="px-6 py-3">
                PACKED THE BRIM
              </th>
              <th scope="col" className="px-6 py-3">
                DOORS
              </th>
              <th scope="col" className="px-6 py-3">
                PASSENGERS
              </th>
              <th scope="col" className="px-6 py-3">
                LUGGAGE
              </th>
              <th scope="col" className="px-6 py-3">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((car) => (
              <tr
                key={car.car_id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-3 py-4 text-center">
                  {car.availability ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Cancel className="text-red-500" />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {car.car_model}
                </td>
                <td className="px-6 py-4">{car.car_type}</td>
                <td className="px-6 py-4">{car.grab_and_drive}</td>
                <td className="px-6 py-4">{car.complete_fee_rate}</td>
                <td className="px-6 py-4">{car.packed_to_the_brim}</td>
                <td className="px-6 py-4">{car.doors}</td>
                <td className="px-6 py-4">{car.passengers}</td>
                <td className="px-6 py-4">{car.luggage}</td>
                <td className="flex gap-2 px-6 py-4">
                  <button
                    onClick={() => handleEdit(car.car_id)}
                    className="flex cursor-pointer items-center rounded-md bg-blue-600 p-1 text-white hover:bg-blue-700"
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDeleteButtonClick(car.car_id)}
                    className="flex cursor-pointer items-center rounded-md bg-yellow-500 p-1 text-white hover:bg-yellow-600"
                  >
                    <Delete fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex h-10 items-center -space-x-px text-base">
            <li>
              <button
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className={`flex h-10 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-3 w-3 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`flex h-10 w-10 items-center justify-center border ${
                    currentPage === index + 1
                      ? "border-blue-300 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages,
                  )
                }
                disabled={currentPage === totalPages}
                className={`flex h-10 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-3 w-3 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {showDeleteModal && (
        <div
          id="deleteModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative h-auto w-full max-w-md p-4">
            <div className="relative rounded-lg bg-white p-6 text-center shadow dark:bg-gray-800">
              <Delete
                style={{ fontSize: "50px", color: "#9ca3af" }}
                className="mx-auto mb-4"
              />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this item?
              </h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCancelDelete}
                  className="rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedCarId!)}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
