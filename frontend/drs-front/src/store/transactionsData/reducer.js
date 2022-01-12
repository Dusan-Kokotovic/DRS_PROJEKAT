import { FormTextArea } from "semantic-ui-react";
import {
  SENT_TRANSACTIONS_DATA_FETCH_FAIL,
  SENT_TRANSACTIONS_DATA_FETCH_SUCCESS,
  RECVD_TRANSACTIONS_DATA_FETCH_FAIL,
  RECVD_TRANSACTIONS_DATA_FETCH_SUCCESS,
  FILTER_TRANSACTIONS_FAIL,
  FILTER_TRANSACTIONS_SUCCESS,
} from "../types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FILTER_TRANSACTIONS_SUCCESS:
    case RECVD_TRANSACTIONS_DATA_FETCH_SUCCESS:
    case SENT_TRANSACTIONS_DATA_FETCH_SUCCESS:
      console.log(payload);
      return payload;
    case FILTER_TRANSACTIONS_FAIL:
    case SENT_TRANSACTIONS_DATA_FETCH_FAIL:
    case RECVD_TRANSACTIONS_DATA_FETCH_FAIL:
      return state;
    default:
      return state;
  }
}
