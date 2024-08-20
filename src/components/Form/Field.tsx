import React from 'react';

interface FieldProps {
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};
