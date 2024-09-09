import React, { forwardRef } from "react";
import { TailSpin } from "react-loader-spinner";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
    severity?: "primary" | "secondary" | "danger";
    size?: "base" | "small";
    isLoading?: boolean;
  }
>(
  (
    {
      fullWidth = true,
      severity = "primary",
      size = "base",
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`
          ${fullWidth ? "w-full dark:text-white" : "sm:min-w-[220px]"}
          px-6 py-3 rounded-md flex items-center justify-center border-[rgb(17,138,126)] ${
            severity === "primary"
              ? "custom-bg text-white"
              : "bg-transparent dark:border-[#fff] border-[#262626]"
          } border-2 duration-200 ease-in font-semibold flex items-center justify-center disabled:bg-[#353535] disabled:border-[#d6d6d64f] disabled:text-gray-500
          ${size === "small" ? "sm:text-sm text-xs" : "sm:text-base text-sm"}
        `}
      >
        {isLoading ? (
          <TailSpin
            visible={true}
            height="28"
            width="28"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        ) : (
          props.children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
