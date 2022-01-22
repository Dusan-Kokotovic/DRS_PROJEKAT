import { COIN_MARKET_DATA_FETCH_SUCCESS, COIN_MARKET_DATA_FETCH_FAIL } from "../types";

const initialState = {
  "externApiId": "",
  "name": "",
  "price": "",
  "percent24hChange": "",
  "symbol": ""
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COIN_MARKET_DATA_FETCH_SUCCESS:
      return payload;
    case COIN_MARKET_DATA_FETCH_FAIL:
      return state;
    default:
      return state;
  }
}