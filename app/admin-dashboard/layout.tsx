"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (route: string) => pathname === route;

  if (pathname === "/admin-dashboard/login") {
    return <div>{children}</div>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-start space-y-[70px] border-r p-10">
        <Image
          src="/assets/img/brand-logo-black.png"
          alt="Brand Logo"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-3">
          <div
            onClick={() => router.push("/admin-dashboard/car-details")}
            className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${
              isActive("/admin-dashboard/car-details")
                ? "bg-[#5E8EFF] text-white"
                : "hover:outline hover:outline-2 hover:outline-gray-300"
            }`}
          >
            <div
              className={`rounded-md p-1 ${
                isActive("/admin-dashboard/car-details")
                  ? "bg-white"
                  : "bg-[#F5F5F5]"
              }`}
            >
              <DirectionsCarOutlinedIcon
                sx={{
                  color: isActive("/admin-dashboard/car-details")
                    ? "#5E8EFF"
                    : "#9A9A9A",
                }}
              />
            </div>
            <p
              className={`whitespace-nowrap ${
                isActive("/admin-dashboard/car-details")
                  ? "text-white"
                  : "text-[#707070]"
              }`}
            >
              Car Details
            </p>
          </div>

          <div
            onClick={() => router.push("/admin-dashboard/protection-and-extras")}
            className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${
              isActive("/admin-dashboard/protection-and-extras")
                ? "bg-[#5E8EFF] text-white"
                : "hover:outline hover:outline-2 hover:outline-gray-300"
            }`}
          >
            <div
              className={`rounded-md p-1 ${
                isActive("/admin-dashboard/protection-and-extras")
                  ? "bg-white"
                  : "bg-[#F5F5F5]"
              }`}
            >
              <ShieldOutlinedIcon
                sx={{
                  color: isActive("/admin-dashboard/protection-and-extras")
                    ? "#5E8EFF"
                    : "#9A9A9A",
                }}
              />
            </div>
            <p
              className={`whitespace-nowrap ${
                isActive("/admin-dashboard/protection-and-extras")
                  ? "text-white"
                  : "text-[#707070]"
              }`}
            >
              Protection and Extras
            </p>
          </div>

          <div
            onClick={() => router.push("/admin-dashboard/homepage-image")}
            className={`flex cursor-pointer items-center gap-3 rounded-md p-2 ${
              isActive("/admin-dashboard/homepage-image")
                ? "bg-[#5E8EFF] text-white"
                : "hover:outline hover:outline-2 hover:outline-gray-300"
            }`}
          >
            <div
              className={`rounded-md p-1 ${
                isActive("/admin-dashboard/homepage-image")
                  ? "bg-white"
                  : "bg-[#F5F5F5]"
              }`}
            >
              <ImageOutlinedIcon
                sx={{
                  color: isActive("/admin-dashboard/homepage-image")
                    ? "#5E8EFF"
                    : "#9A9A9A",
                }}
              />
            </div>
            <p
              className={`whitespace-nowrap ${
                isActive("/admin-dashboard/homepage-image")
                  ? "text-white"
                  : "text-[#707070]"
              }`}
            >
              Homepage Image
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="flex w-full border-b">
          <div className="w-full border-r"></div>
          <div className="group flex cursor-pointer items-center gap-2 px-8 py-5 hover:bg-gray-100"             onClick={() => router.push("/admin-dashboard/login")}>
            <LogoutOutlinedIcon
              sx={{
                color: "#9A9A9A",
                transition: "color 0.2s",
              }}
              className="group-hover:text-red-500"
            />
            <p className="text-[#707070] group-hover:text-red-500">Logout</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
