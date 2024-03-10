import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: 0,
};

const mySlice = createSlice({
  name: "price",
  initialState: initialState,
  reducers: {
    updateValue: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { updateValue } = mySlice.actions;
export const { actions, reducer } = mySlice;
