import {
  GET_CURRENT_USER_INFO_SUCCESS,
  GET_CURRENT_USER_INFO_FAIL,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
  WITHDRAW,
  WITHDRAW_ERROR,
  EXCHANGE,
  EXCHANGE_ERROR
} from "../types";

import {
  _getCurrentUserInfo,
  verifyUser,
  withdrawMoney, 
  exchangeMoney
} from "../../services/userDataServices/services";

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
  return verifyUser(cardNumber, expirationDate, pinCode).then(
    (response) => {
      dispatch({ type: VERIFICATION_SUCCESS, payload: response });
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: VERIFICATION_FAIL });
      console.log(error);
      return Promise.reject();
    }
  );
};

export const WithdrawAmount = (amount) => (
  dispatch
) => {
  return withdrawMoney (amount).then(
    (response) => {
      dispatch({type: WITHDRAW});
      return Promise.resolve();
      
    },
    (error) => {
      dispatch({type : WITHDRAW_ERROR});
      console.log(error);
      return Promise.reject();
    }
  )
}

export const ExchangeAmount = (amount) =>(
  dispatch
) => {
  return exchangeMoney (amount).then(
    (response) => {
      dispatch({type: EXCHANGE});
      return Promise.resolve();
    },
    (error) => {
      dispatch({type : EXCHANGE_ERROR});
      console.log(error);
      return Promise.reject();
    }
  )

}
