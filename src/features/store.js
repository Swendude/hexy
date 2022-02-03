import { configureStore } from "@reduxjs/toolkit";
import hexmapSlice from "./hexmap/hexmapSlice";
export const store = configureStore({
  reducer: { hexmap: hexmapSlice },
});
