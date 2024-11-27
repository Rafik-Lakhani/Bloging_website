import React, { useId, forwardRef } from "react";

function Input({
  label,
  className = "",
  type = "text",
  ...props
}, ref) {
  const id = useId();
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id}
          className="inline-block mb-2 text-white font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          className={`px-4 py-3 rounded-xl bg-gray-700/90 backdrop-blur-sm text-white outline-none focus:ring-offset-2 border border-gray-600 w-full placeholder:text-gray-400 hover:border-gray-500 focus:border-gray-400 transition-all duration-300 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
}

export default forwardRef(Input);
