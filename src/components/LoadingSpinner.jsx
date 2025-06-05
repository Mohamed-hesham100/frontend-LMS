import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader className="animate-spin h-17 w-17 text-blue-600" />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
