import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateHideBalance: (state, action) => {
      state.hideBalance = action.payload;
    },
  },
});

export const { updateHideBalance } = settingsSlice.actions;

export default settingsSlice.reducer;
