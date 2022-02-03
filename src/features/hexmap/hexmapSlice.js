import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hoveredHex: null,
};

export const hexmapSlice = createSlice({
  name: "hexmap",
  initialState,
  reducers: {
    select: (state, action) => {
      state.hoveredHex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { select } = hexmapSlice.actions;

export default hexmapSlice.reducer;
