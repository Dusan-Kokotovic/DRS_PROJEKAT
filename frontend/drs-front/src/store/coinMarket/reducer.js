import { COIN_MARKET_DATA_FETCH_SUCCESS, 
  COIN_MARKET_DATA_FETCH_FAIL
 } from "../types";

const initialState = []

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COIN_MARKET_DATA_FETCH_SUCCESS:
      console.log(payload);
      return payload;
    case COIN_MARKET_DATA_FETCH_FAIL:
      return state;
    default:
      return state;
  }
}