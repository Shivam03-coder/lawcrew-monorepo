import { Loader } from "lucide-react";
import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="center h-screen w-full">
      <Loader size={39} className="animate-spin" />
    </div>
  );
};

export default LoaderSpinner;
