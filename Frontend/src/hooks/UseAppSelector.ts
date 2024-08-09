// src/app/hooks.ts
import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../app/store";

// Use `RootState` type for TypeScript support
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
