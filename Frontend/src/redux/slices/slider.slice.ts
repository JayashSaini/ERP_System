// src/features/sidebar/sidebarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  open: boolean;
  animate: boolean;
}

const initialState: SidebarState = {
  open: false,
  animate: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.open = !state.open;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setSidebarAnimate(state, action: PayloadAction<boolean>) {
      state.animate = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setSidebarAnimate } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
