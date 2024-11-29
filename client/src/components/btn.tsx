import * as React from "react";
import { ButtonProps } from "@/types";

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`gap-1 py-3.5 px-4 rounded-lg border border-white border-solid ${className}`}
    >
      {children}
    </button>
  );
};