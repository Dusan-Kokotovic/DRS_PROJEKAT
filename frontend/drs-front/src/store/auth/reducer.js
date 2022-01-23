import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EDIT_FAIL,
  EDIT_SUCCESS,
} from "../types";

const user = localStorage.getItem("user");

const initialState = user ? { isLoggedIn: true } : { isLoggedIn: false };

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case EDIT_FAIL:
    case EDIT_SUCCESS:
    case LOGIN_SUCCESS:
      return { isLoggedIn: true };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case REGISTER_SUCCESS:
      return { isLoggedIn: false };

    default:
      return state;
  }
}
