"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, Cancel, Edit, Delete } from "@mui/icons-material";

export default function CarDetails() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const carDetails = [
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
    {
      id: "afadf",
      model: "Nissan Sentra",
      type: "Economy Sedan",
      grabAndDrive: 20,
      completeFeeRate: 18,
      packedTheBrim: 15,
      doors: 5,
      passengers: 5,
      luggage: 3,
      available: true,
    },
    {
      id: "sdfgsd",
      model: "Nissan Altima",
      type: "Economy Sedan",
      grabAndDrive: 15,
      completeFeeRate: 12,
      packedTheBrim: 10,
      doors: 4,
      passengers: 4,
      luggage: 2,
      available: false,
    },
  ];

  const totalPages = Math.ceil(carDetails.length / rowsPerPage);

  // Slice data for the current page
  const currentData = carDetails.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleEdit = (id: string): void => {
    router.push(`/admin-dashboard/car-details/${id}`);
  };

  const handleDelete = (id: string): void => {
    console.log(`Deleted car with ID: ${id}`);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="flex items-center justify-between">
        <div className="text-[24px]">Vehicle Price and Info Settings</div>
        <div className="cursor-pointer rounded-md bg-[#5E8EFF] px-3 py-2 text-white">
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
                key={car.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-3 py-4 text-center">
                  {car.available ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Cancel className="text-red-500" />
                  )}
                </td>
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {car.model}
                </th>
                <td className="px-6 py-4">{car.type}</td>
                <td className="px-6 py-4">{car.grabAndDrive}</td>
                <td className="px-6 py-4">{car.completeFeeRate}</td>
                <td className="px-6 py-4">{car.packedTheBrim}</td>
                <td className="px-6 py-4">{car.doors}</td>
                <td className="px-6 py-4">{car.passengers}</td>
                <td className="px-6 py-4">{car.luggage}</td>
                <td className="flex gap-2 px-6 py-4">
                  <button
                    onClick={() => handleEdit(car.id)}
                    className="flex cursor-pointer items-center rounded-md bg-blue-600 p-1 text-white hover:bg-blue-700"
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
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
    </div>
  );
}
