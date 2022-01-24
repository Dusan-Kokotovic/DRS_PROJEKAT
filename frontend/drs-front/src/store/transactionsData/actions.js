import {
  SENT_TRANSACTIONS_DATA_FETCH_SUCCESS,
  SENT_TRANSACTIONS_DATA_FETCH_FAIL,
  RECVD_TRANSACTIONS_DATA_FETCH_FAIL,
  RECVD_TRANSACTIONS_DATA_FETCH_SUCCESS,
  FILTER_TRANSACTIONS_FAIL,
  FILTER_TRANSACTIONS_SUCCESS,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_FAIL,
} from "../types";

import {
  fetchSentTransactions,
  fetchReceivedTransactions,
  filterTransactions,
  sendTransaction,
} from "../../services/transactionsDataServices/services";

import { setMessage } from "../message/actions";

export const send = (receiver, amount, coin) => (dispatch) => {
  return sendTransaction(receiver, coin, amount).then((response) => {
    if (response.status === 200) {
      dispatch(setMessage(response.msg));
      dispatch({ type: SEND_TRANSACTION_SUCCESS });
    } else {
      dispatch(setMessage(response.msg));
      dispatch({ type: SEND_TRANSACTION_FAIL });
    }
    return Promise.resolve();
  });
};

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
      dispatch({ type: RECVD_TRANSACTIONS_DATA_FETCH_FAIL });
      return Promise.reject();
    }
  );
};
