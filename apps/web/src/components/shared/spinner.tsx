import { Loader } from "lucide-react";
import React from "react";
import { ClipLoader, MoonLoader } from "react-spinners";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 23, color = "#ffffff" }) => {
  return <Loader className="animate-spin" size={size} color={color} />;
};

export default Spinner;
