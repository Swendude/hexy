import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showOrcs: false,
};

export const storymasterSlice = createSlice({
  name: "storymaster",
  initialState,
  reducers: {
    showOrcs: (state) => {
      state.showOrcs = !state.showOrcs;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showOrcs } = storymasterSlice.actions;

export default storymasterSlice.reducer;
