import { combineReducers } from "@reduxjs/toolkit";
import { reducer as listCoinReducer } from "./listcoin/slideListCoin";

const rootReducer = combineReducers({
  slideListCoin: listCoinReducer,
});

export default rootReducer;
