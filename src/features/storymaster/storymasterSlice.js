import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLifeform: "",
};

export const storymasterSlice = createSlice({
  name: "storymaster",
  initialState,
  reducers: {
    showLifeForm: (state, action) => {
      state.showLifeform = action.payload.lifeform;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLifeForm } = storymasterSlice.actions;

export default storymasterSlice.reducer;
