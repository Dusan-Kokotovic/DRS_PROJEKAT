import {
  SENT_TRANSACTIONS_DATA_FETCH_SUCCESS,
  SENT_TRANSACTIONS_DATA_FETCH_FAIL,
  RECVD_TRANSACTIONS_DATA_FETCH_FAIL,
  RECVD_TRANSACTIONS_DATA_FETCH_SUCCESS,
  FILTER_TRANSACTIONS_FAIL,
  FILTER_TRANSACTIONS_SUCCESS,
} from "../types";

import {
  fetchSentTransactions,
  fetchReceivedTransactions,
  filterTransactions,
} from "../../services/userServices";

export const filter = (
  name,
  amountFrom,
  amountTo,
  dateFrom,
  dateTo,
  isSentTransactions
) => (dispatch) => {
  return filterTransactions(
    name,
    amountFrom,
    amountTo,
    dateFrom,
    dateTo,
    isSentTransactions
  ).then(
    (response) => {
      dispatch({ type: FILTER_TRANSACTIONS_SUCCESS, payload: response });
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: FILTER_TRANSACTIONS_FAIL });
      return Promise.reject();
    }
  );
};

export const getSentTransactions = () => (dispatch) => {
  return fetchSentTransactions().then(
    (response) => {
      dispatch({
        type: SENT_TRANSACTIONS_DATA_FETCH_SUCCESS,
        payload: response,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: SENT_TRANSACTIONS_DATA_FETCH_FAIL });
      return Promise.reject();
    }
  );
};

export const getReceivedTransactions = () => (dispatch) => {
  return fetchReceivedTransactions().then(
    (response) => {
      dispatch({
        type: RECVD_TRANSACTIONS_DATA_FETCH_SUCCESS,
        payload: response,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.msg;
      dispatch({ type: RECVD_TRANSACTIONS_DATA_FETCH_FAIL });
      return Promise.reject();
    }
  );
};
