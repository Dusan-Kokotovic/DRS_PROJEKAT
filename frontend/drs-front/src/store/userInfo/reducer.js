import {
  GET_CURRENT_USER_INFO_FAIL,
  GET_CURRENT_USER_INFO_SUCCESS,
} from "../types";

const initialState = {
  name: "",
  lastName: "",
  address: "",
  city: "",
  country: "",
  phone: "",
  email: "",
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_USER_INFO_SUCCESS:
      return {
        name: payload.name,
        lastName: payload.lastName,
        address: payload.address,
        country: payload.country,
        phone: payload.phone,
        city: payload.city,
        email: payload.email,
      };
    case GET_CURRENT_USER_INFO_FAIL:
      return state;
    default:
      return state;
  }
}
