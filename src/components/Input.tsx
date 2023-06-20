import React from "react";
import cls from "classnames";

interface InputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  labelInline?: boolean;
  size?: "small" | "regular";
  fullWidth?: boolean;
  type?: "text" | "number";
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  className = "",
  labelInline = false,
  size = "regular",
  fullWidth = false,
  type = "text",
}) => {
  const containerCls = cls(
    "flex",
    {
      "items-center": labelInline,
      "flex-col items-start": !labelInline,
    },
    className
  );
  const labelCls = cls("text-gray-700", {
    "mr-2": labelInline,
    "mb-1": !labelInline,
  });
  const inputCls = cls(
    "border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-blue-500",
    {
      "w-full": fullWidth,
      "px-2 py-1": size === "small",
      "px-3 py-2": size === "regular",
    }
  );

  return (
    <label className={containerCls}>
      <span className={labelCls}>{label}:</span>
      <input
        className={inputCls}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

export default Input;
