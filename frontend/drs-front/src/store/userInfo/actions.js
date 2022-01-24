import {
  GET_CURRENT_USER_INFO_SUCCESS,
  GET_CURRENT_USER_INFO_FAIL,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
  DEPOSIT,
  DEPOSIT_ERROR,
  EXCHANGE,
  EXCHANGE_ERROR,
} from "../types";

import {
  _getCurrentUserInfo,
  verifyUser,
  depositMoney,
  exchangeMoney,
} from "../../services/userDataServices/services";
import { setMessage } from "../message/actions";

export const getCurrentUserInfo = () => (dispatch) => {
  return _getCurrentUserInfo()
    .then((response) => {
      dispatch({ type: GET_CURRENT_USER_INFO_SUCCESS, payload: response });
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({ type: GET_CURRENT_USER_INFO_FAIL });
      const message = error.msg;
      console.log(message);

      return Promise.reject();
    });
};

export const submitCardData = (cardNumber, expirationDate, pinCode) => (
  dispatch
) => {
  return verifyUser(cardNumber, expirationDate, pinCode).then((response) => {
    if (response.status === 200) {
      dispatch({ type: VERIFICATION_SUCCESS, payload: response });
      dispatch(setMessage("Successfully verified"));
    } else {
      console.log(response);
      dispatch({ type: VERIFICATION_FAIL });
    }
    return Promise.resolve();
  });
};

export const DepositAmount = (amount) => (dispatch) => {
  return depositMoney(amount).then(
    (response) => {
      dispatch({ type: DEPOSIT });
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: DEPOSIT_ERROR });
      console.log(error);
      return Promise.reject();
    }
  );
};

export const ExchangeAmount = (amount, coin, price) => (dispatch) => {
  return exchangeMoney(amount, coin, price).then((response) => {
    if (response.status === 200) {
      dispatch({ type: EXCHANGE });
    } else {
      dispatch({ type: EXCHANGE_ERROR });
    }
    dispatch(setMessage(response.msg));
    return Promise.resolve();
  });
};
