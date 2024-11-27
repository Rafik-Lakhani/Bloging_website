import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-purple-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium border border-transparent
      hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
      focus:ring-offset-gray-900 active:bg-purple-800 disabled:opacity-50
      disabled:cursor-not-allowed transition-colors duration-200
      ${className} ${textColor} ${bgColor}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
