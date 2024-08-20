import React from "react";
import { useFormContext } from "react-hook-form";

interface ErrorMessageProps {
  field: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ field }) => {
  const { formState: { errors } } = useFormContext();
  const error = errors[field];

  if (!error) return null;

  return <span className="text-red-500 text-sm">{(error as any).message}</span>;
};
