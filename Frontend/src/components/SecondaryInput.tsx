import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppSelector } from "../hooks/UseAppSelector";

interface SecondaryInputProps {
  handleEditClick: () => void;
  value: string | number | undefined;
}

const SecondaryInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextFieldProps & SecondaryInputProps
> = ({ handleEditClick, value, ...props }, ref) => {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");
  const inputRef = useRef<HTMLInputElement>(null);
  const { isChangedAllowed } = useAppSelector((state) => state.project);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setThemeMode(storedTheme);
    }
  }, []);

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement && props.type === "number") {
      const preventScroll = (e: WheelEvent) => e.preventDefault();
      inputElement.addEventListener("wheel", preventScroll, { passive: false });

      return () => {
        inputElement.removeEventListener("wheel", preventScroll);
      };
    }
  }, [props.type]);

  const onClickHandler = () => {
    handleEditClick();
  };

  return (
    <TextField
      ref={ref}
      variant="filled"
      value={value}
      inputRef={inputRef} // Assign the ref here
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              opacity: 0, // Initially hidden
              transition: "opacity 0.2s ease-in-out", // Smooth transition
            }}
          >
            <IconButton onClick={onClickHandler} disabled={!isChangedAllowed}>
              <EditIcon
                sx={{
                  color: themeMode === "dark" ? "#e5e5e5" : "#000000",
                  width: "20px",
                }}
              />
            </IconButton>
          </InputAdornment>
        ),
        inputProps: {
          ...props.InputProps?.inputProps,
          ...(props.type === "number" && {
            style: { MozAppearance: "textfield" },
            inputMode: "numeric",
          }),
          ...(props.type === "date" && {
            style: {
              color: themeMode === "dark" ? "#e5e5e5" : "#262626",
              textShadow:
                themeMode === "dark" ? "0 0 0 #e5e5e5" : "0 0 0 #262626",
            },
          }),
        },
      }}
      sx={{
        "& .MuiInputBase-input": {
          color: props.defaultValue
            ? "#e5e5e5"
            : themeMode === "dark"
            ? "#ffffff"
            : "#262626",
          padding: "0 3px",
          fontSize: "14px",
        },
        "& .MuiInputLabel-root": {
          color: themeMode === "dark" ? "#ffffff" : "#262626",
        },
        "& .MuiFilledInput-root": {
          "&:hover": {
            "& .MuiInputAdornment-root": {
              opacity: 1, // Show icon on hover
            },
          },
          "&::before": {
            borderBottomColor: themeMode === "dark" ? "#262626" : "#000000",
          },
        },
        "& input[type=number]": {
          MozAppearance: "textfield",
          "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        },
        "& input[type=date]::-webkit-calendar-picker-indicator": {
          display: "none",
        },
      }}
    />
  );
};

const ForwardedSecondaryInput = React.forwardRef(SecondaryInput);
ForwardedSecondaryInput.displayName = "SecondaryInput";

export default ForwardedSecondaryInput;
