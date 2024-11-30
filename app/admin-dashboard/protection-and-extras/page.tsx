"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, Cancel, Edit, Delete } from "@mui/icons-material";

const dummyData = [
  {
    id: "6f1b4a89-a78f-41c2-bbc9-12345abcde01",
    type: "Cover",
    name: "Basic Cover",
    pricePerDay: 0,
    available: true,
  },
  {
    id: "2e1c3d90-b47a-46f1-bbc9-12345abcde02",
    type: "Cover",
    name: "Totally at Ease Cover",
    pricePerDay: 8,
    available: true,
  },
  {
    id: "7a9d5e32-c81f-40e5-ace9-12345abcde03",
    type: "Cover",
    name: "Supremely Relax Cover",
    pricePerDay: 12,
    available: false,
  },
  {
    id: "1d2c4f67-d98a-4bf7-bde9-12345abcde04",
    type: "Extras",
    name: "Additional Driver",
    pricePerDay: 5,
    available: true,
  },
  {
    id: "8b3a5f68-c71d-49a5-bde9-12345abcde05",
    type: "Extras",
    name: "Driver under 21",
    pricePerDay: 15,
    available: true,
  },
  {
    id: "3e7f4c91-f20b-46f6-bce9-12345abcde06",
    type: "Extras",
    name: "Driver under 25",
    pricePerDay: 5,
    available: false,
  },
  {
    id: "5f3b6a92-d32c-49d1-bde9-12345abcde07",
    type: "Extras",
    name: "GPS Navigation system",
    pricePerDay: 10,
    available: true,
  },
  {
    id: "4d1a5b93-e43d-41b4-bae9-12345abcde08",
    type: "Extras",
    name: "Wifi on the go",
    pricePerDay: 7,
    available: true,
  },
  {
    id: "9e6c2a94-f54e-45b6-bce9-12345abcde09",
    type: "Extras",
    name: "Lifestyle Assistance",
    pricePerDay: 35,
    available: true,
  },
  {
    id: "6f8b7d95-a65f-43d7-bde9-12345abcde10",
    type: "Extras",
    name: "Roadside Assistance",
    pricePerDay: 7,
    available: false,
  },
  {
    id: "2c3a8f96-b76a-49f8-bde9-12345abcde11",
    type: "Extras",
    name: "Personal Accident Insurance",
    pricePerDay: 30,
    available: true,
  },
  {
    id: "7e5d9b97-c87b-42b9-bae9-12345abcde12",
    type: "Extras",
    name: "Infant Car Seats",
    pricePerDay: 5,
    available: true,
  },
  {
    id: "1f9d6c98-d98c-46ba-bde9-12345abcde13",
    type: "Extras",
    name: "Booster Car Seats",
    pricePerDay: 5,
    available: true,
  },
];

export default function ProtectionAndExtras() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(dummyData.length / rowsPerPage);
  const currentData = dummyData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-[#F9F9F9] p-8">
      <div className="flex items-center justify-between">
        <div className="text-[24px]">Protection and Extra Settings</div>
        <div
          className="cursor-pointer rounded-md bg-[#5E8EFF] px-3 py-2 text-white"
          onClick={() =>
            router.push("/admin-dashboard/protection-and-extras/add-new-offer")
          }
        >
          + Add New Offer
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="border-b bg-white text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Offer Detail
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((offer) => (
              <tr
                key={offer.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-3 py-4 text-center">
                  {offer.available ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Cancel className="text-red-500" />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {offer.name}
                </td>
                <td className="px-6 py-4">{offer.type}</td>
                <td className="px-6 py-4">{offer.pricePerDay} JOD</td>
                <td className="flex gap-2 px-6 py-4">
                  <button className="flex cursor-pointer items-center rounded-md bg-blue-600 p-1 text-white hover:bg-blue-700">
                    <Edit fontSize="small" />
                  </button>
                  <button className="flex cursor-pointer items-center rounded-md bg-yellow-500 p-1 text-white hover:bg-yellow-600">
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
