// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../redux/slices/slider.slice";
import authReducer from "../redux/slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
  },
});

// Type for the entire state of the Redux store
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;
