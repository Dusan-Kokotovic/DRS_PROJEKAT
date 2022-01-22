import { GET_USER_COIN_DATA_FAIL, GET_USER_COIN_DATA_SUCCESS } from "../types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_COIN_DATA_SUCCESS:
      return payload;
    case GET_USER_COIN_DATA_FAIL:
      return state;
    default:
      return initialState;
  }
}
