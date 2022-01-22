import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EDIT_FAIL,
  EDIT_SUCCESS
} from "../types";

const user = localStorage.getItem("user");

const initialState = user ? { isLoggedIn: true } : { isLoggedIn: false };

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { isLoggedIn: true };
    case LOGIN_FAIL:
      return { isLoggedIn: false };
    case REGISTER_FAIL:
      return { isLoggedIn: false };
    case REGISTER_SUCCESS:
      return { isLoggedIn: false };
    case EDIT_FAIL:
      return { isLoggedIn: true };
    case EDIT_SUCCESS:
      return { isLoggedIn: true };

    default:
      return state;
  }
}
