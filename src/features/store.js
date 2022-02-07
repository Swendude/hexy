import { configureStore } from "@reduxjs/toolkit";
import hexmapSlice from "./hexmap/hexmapSlice";
import storymasterSlice from "./storymaster/storymasterSlice";
export const store = configureStore({
  reducer: { hexmap: hexmapSlice, storymaster: storymasterSlice },
});
