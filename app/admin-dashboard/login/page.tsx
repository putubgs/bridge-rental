"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./adminlogin.component.css";

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "12345";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      Cookies.set("isAuthenticated", "true", { expires: 1 });
      router.push("/admin-dashboard/car-details");
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="flex items-center w-full justify-center bg-gray-50 font-[sans-serif]">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Login to Admin Dashboard
            </h2>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">
                  {errorMessage}
                </p>
              )}
              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  Password
                </label>
                <div className="flex items-center rounded-md border border-gray-300 px-4 py-3 space-x-2">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  type="submit"
                  className="w-full rounded-lg bg-[#5E8EFF] px-4 py-3 text-sm tracking-wide text-white hover:bg-blue-700 focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
