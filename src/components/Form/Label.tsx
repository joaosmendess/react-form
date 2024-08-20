import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-zinc-800">
    {children}
  </label>
);
