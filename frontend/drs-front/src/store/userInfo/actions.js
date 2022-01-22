import {
  GET_CURRENT_USER_INFO_SUCCESS,
  GET_CURRENT_USER_INFO_FAIL,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
} from "../types";

import {
  _getCurrentUserInfo,
  verifyUser,
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
