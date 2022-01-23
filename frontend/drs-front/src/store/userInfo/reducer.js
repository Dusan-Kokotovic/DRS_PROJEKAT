import {
  GET_CURRENT_USER_INFO_FAIL,
  GET_CURRENT_USER_INFO_SUCCESS,
  VERIFICATION_FAIL,
  VERIFICATION_SUCCESS,
} from "../types";

const initialState = {
  name: "",
  lastName: "",
  address: "",
  city: "",
  country: "",
  phone: "",
  email: "",
  isVerified: false,
  money: 0,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case VERIFICATION_SUCCESS:
    case GET_CURRENT_USER_INFO_SUCCESS:
      return {
        name: payload.name,
        lastName: payload.lastName,
        address: payload.lastName,
        country: payload.country,
        phone: payload.phone,
        city: payload.city,
        email: payload.email,
        isVerified: payload.isVerified,
        money: payload.money,
      };
    case GET_CURRENT_USER_INFO_FAIL:
    case VERIFICATION_FAIL:
      return state;
    default:
      return state;
  }
}
