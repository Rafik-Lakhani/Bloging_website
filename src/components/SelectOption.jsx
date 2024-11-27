import React, { useId, forwardRef } from "react";

function SelectOption({ option, label, classname ='', ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 mr-4 pl-1 text-gray-300"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={` w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer transition duration-200 hover:border-purple-400 ${classname}`}
        {...props}
      >
        {option?.map(
          (opt) =>
            opt && (
              <option
                key={opt}
                value={opt}
                className="bg-gray-800 text-white"
              >
                {opt}
              </option>
            )
        )}
      </select>
    </div>
  );
}

export default forwardRef(SelectOption);
