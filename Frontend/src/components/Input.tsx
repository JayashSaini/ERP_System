import React from "react";

// Define the Input component with React.forwardRef
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full bg-transparent border-2 border-slate-700 rounded-md text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
    />
  );
});

// Set the display name for better debugging in React DevTools
Input.displayName = "Input";

export default Input;
