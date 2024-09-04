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
      className="w-full bg-transparent border-2 border-neutral-700 rounded-md dark:text-white text-neutral-800 px-6 py-3 text-base hover:dark:border-[#fff]  cursor-pointer transition placeholder:text-neutral-600 dark:placeholder:text-neutral-300"
    />
  );
});

// Set the display name for better debugging in React DevTools
Input.displayName = "Input";

export default Input;
