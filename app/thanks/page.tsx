"use client"
import React, { useEffect, useState } from "react";
import { CheckCircle, Home, Gift } from "lucide-react";

export default function Thanks() {
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setShowElements(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div
        className={`transform transition-all duration-1000 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "-translate-y-12 opacity-0"
        }`}
      >
        <CheckCircle className="w-20 h-20 mb-6 text-green-500" />
      </div>

      <div
        className={`text-center space-y-4 max-w-lg px-4 transform transition-all duration-1000 delay-300 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }`}
      >
        <h1 className="mb-2 text-4xl font-bold text-gray-800">
          Thank You for Your Purchase!
        </h1>

        <p className="mb-6 text-gray-600">
          We're preparing your order with care.
           {/* You'll receive a confirmation email shortly. */}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </a>

          <a
            href="/orders"
            className="inline-flex items-center px-6 py-3 text-white transition-colors duration-200 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            <Gift className="w-5 h-5 mr-2" />
            View Order
          </a>
        </div>
      </div>

      {/* <div
        className={`mt-12 text-center transform transition-all duration-1000 delay-500 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-500">
          Need help?{" "}
          <a
            href="/support"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Contact our support team
          </a>
        </p>
      </div> */}
    </div>
  );
}
