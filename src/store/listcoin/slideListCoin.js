import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callAPI from "../../api/configApi";

export const fetchAsyncGetListCoin = createAsyncThunk(
  "listCoin/fetchAsyncGetListCoin",
  async (arg) => {
    const res = await callAPI("coins/list", "get", null);
    return res.data;
  }
);

const initialState = {
  cryptoData: [],
};

const slideListCoin = createSlice({
  name: "listCoin",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetListCoin.fulfilled, (state, action) => {
      return { ...state, cryptoData: action.payload };
    });
  },
});
export const { actions, reducer } = slideListCoin;
