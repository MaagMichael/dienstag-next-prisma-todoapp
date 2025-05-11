// import { LoginUser } from "@/actions/actions";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-gray-500 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header with Tabs */}
        <div className="grid grid-cols-2 text-center bg-gray-700 text-white">
          <button className="flex-1 py-4 font-medium bg-gray-500">
            Sign In
          </button>

          <Link href="/register">
            <button className="flex-1 py-4 font-medium">Sign Up</button>
          </Link>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back
          </h2>

          <form 
          // action={LoginUser}
          >
            <div className="mb-4 text-left">
              <label
                htmlFor="email"
                className=" text-gray-800 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-6 text-left">
              <label
                htmlFor="password"
                className=" text-gray-800 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Sign in
            </button>
          </form>

          <Link href="/register">
            <p className="mt-4 text-center text-sm text-gray-600">
              Forgot your password?
            </p>
          </Link>

          <p>e.g. "email": "user1@email.com", "password": "password1"</p>
        </div>
      </div>
    </div>
  );
}
