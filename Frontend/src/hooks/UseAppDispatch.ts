// src/app/hooks.ts
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";

// Use `AppDispatch` type for TypeScript support
export const useAppDispatch = () => useDispatch<AppDispatch>();
