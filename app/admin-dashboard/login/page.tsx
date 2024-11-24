"use client";

import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./adminlogin.component.css"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Login to Admin Dashboard
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none"
                    placeholder="Enter user name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  Password
                </label>
                <div className="flex items-center rounded-md border border-gray-300 px-4 py-3 space-x-2">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm text-gray-800 outline-none"
                    placeholder="Enter password"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Visibility className="icon-gray" />
                    ) : (
                      <VisibilityOff className="icon-gray" />
                    )}
                  </div>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full rounded-lg bg-[#5E8EFF] px-4 py-3 text-sm tracking-wide text-white hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
