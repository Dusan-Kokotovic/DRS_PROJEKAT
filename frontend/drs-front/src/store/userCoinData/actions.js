import {
  GET_USER_COIN_DATA_FAIL,
  GET_USER_COIN_DATA_SUCCESS,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_FAIL,
} from "../types";

import { getUserCoinsData } from "../../services/userDataServices/services";

export const getUserCoinData = () => (dispatch) => {
  return getUserCoinsData()
    .then((response) => {
      dispatch({ type: GET_USER_COIN_DATA_SUCCESS, payload: response });
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({ type: GET_USER_COIN_DATA_FAIL });
      console.log(error);
      return Promise.reject();
    });
};
