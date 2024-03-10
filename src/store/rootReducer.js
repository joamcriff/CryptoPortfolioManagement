import { combineReducers } from "@reduxjs/toolkit";
import { reducer as listCoinReducer } from "./listcoin/slideListCoin";
import { reducer as slicePrice } from "./price/slicePrice";
const rootReducer = combineReducers({
  slideListCoin: listCoinReducer,
  mySlice: slicePrice,
});

export default rootReducer;
