import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_MESSAGE,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../types";

import {
  userLogin,
  userLogout,
  userRegister,
} from "../../services/userServices";

export const login = (email, password) => (dispatch) => {
  return userLogin(email, password).then(
    (isLoggedIn) => {
      dispatch({ type: LOGIN_SUCCESS, payload: { isLoggedIn: isLoggedIn } });
      return Promise.resolve();
    },
    (error) => {
      const message = error.msg;

      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });

      return Promise.reject();
    }
  );
};

export const registerAction = (
  email,
  password,
  name,
  lastName,
  address,
  city,
  country,
  phone
) => (dispatch) => {
  return userRegister(
    email,
    password,
    name,
    lastName,
    address,
    city,
    country,
    phone
  )
    .then((success) => {
      dispatch({ type: REGISTER_SUCCESS });
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({ type: REGISTER_FAIL });
      return Promise.reject();
    });
};

export const logout = () => {
  userLogout();
};
