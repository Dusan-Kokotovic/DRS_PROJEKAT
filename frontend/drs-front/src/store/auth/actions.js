import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_MESSAGE,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  EDIT_FAIL,
  EDIT_SUCCESS,
} from "../types";

import {
  userLogin,
  userLogout,
  userRegister,
  userEdit,
} from "../../services/authServices/services";

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
    .then((isValid) => {
      if (isValid) {
        dispatch({ type: REGISTER_SUCCESS });
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .catch((error) => {
      dispatch({ type: REGISTER_FAIL });
      return Promise.reject();
    });
};

export const logout = () => {
  userLogout();
};
export const editAction = (
  email,
  name,
  lastName,
  address,
  city,
  country,
  phone,
  password
) => (dispatch) => {
  return userEdit(
    email,
    name,
    lastName,
    address,
    city,
    country,
    phone,
    password
  )
    .then((success) => {
      dispatch({ type: EDIT_SUCCESS });
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({ type: EDIT_FAIL });
      return Promise.reject();
    });
};
