import {
  GET_CURRENT_USER_INFO_SUCCESS,
  GET_CURRENT_USER_INFO_FAIL,
} from "../types";

import { _getCurrentUserInfo } from "../../services/userServices";

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
