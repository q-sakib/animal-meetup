import * as React from "react";
import { InputFieldProps } from "@/types";

export const InputField: React.FC<InputFieldProps> = ({ label, type = "text", className }) => {
  const id = React.useId();

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={label}
        aria-label={label}
        className={`gap-1 py-3.5 pr-5 pl-4 mt-4 rounded-lg border border-white border-solid bg-zinc-100 w-full ${className}`}
      />
    </div>
  );
};