import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  accept?: string;
  error?: any;
}

export const Input: React.FC<InputProps> = ({ name, type = "text", placeholder, accept, error }) => {
  const { register } = useFormContext();
  return (
    <>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        accept={accept}
        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
        {...register(name)}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </>
  );
};
