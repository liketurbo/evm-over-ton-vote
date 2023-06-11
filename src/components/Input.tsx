import React from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  className = "",
}) => {
  return (
    <label className={`flex items-center ${className}`}>
      <span className="text-gray-700 mr-2">{label}:</span>
      <input
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

export default Input;
