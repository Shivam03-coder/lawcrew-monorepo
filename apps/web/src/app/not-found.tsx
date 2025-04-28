import React from "react";
import {
  FileX2,
  ArrowLeft,
  Calculator,
  ClipboardList,
  PiggyBank,
} from "lucide-react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="h-full w-full">
        {/* Main Content Container */}
        <div className="bg-white min-h-screen p-8 text-center md:p-12">
          {/* 404 Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <FileX2 className="h-24 w-24 animate-pulse text-indigo-600" />
              <div className="absolute -right-2 -top-2">
                <div className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  404
                </div>
              </div>
            </div>
          </div>

          {/* Main Text */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="mb-8 text-gray-600">
            Oops! It seems like this financial document got lost in our filing
            system.
          </p>

          {/* Features Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-indigo-50 p-4">
              <Calculator className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Tax Planning</h3>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <PiggyBank className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">
                Finance Management
              </h3>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <ClipboardList className="mx-auto mb-2 h-8 w-8 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Task Tracking</h3>
            </div>
          </div>

          {/* Back Button */}
          <Link
            href="/lawcrew"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-indigo-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Link>
        {/* Footer */}
        <p className="mt-8 text-center text-gray-500">
          © {new Date().getFullYear()} LaCrew. All rights reserved.
        </p>
        </div>

      </div>
    </div>
  );
}

export default NotFound;
