import {
  getReceivedTransactionsPath,
  getSentTransactionsPath,
  sendTransactionPath,
} from "./urls";
import { authHeader } from "../auth-header";

export const sendTransaction = async (receiverEmail, coinId, amount) => {
  let token = localStorage.getItem("user");

  if (token === null || token === "") return;

  let body = { receiver: receiverEmail, coinId: coinId, amount: amount };

  let reqOptions = {
    method: "post",
    headers: { "content-type": "application/json", Authorization: token },
    body: JSON.stringify(body),
  };

  return fetch(sendTransactionPath, reqOptions)
    .then((response) =>
      response.json().then(({ msg }) => ({ status: response.status, msg }))
    )
    .then((data) => {
      return data;
    });
};

export const filterTransactions = async (
  name,
  amountFrom,
  amountTo,
  dateFrom,
  dateTo,
  isSentTransactions
) => {
  let token = localStorage.getItem("user");

  if (token == null || token === "") return;

  let auth = authHeader();
  let data = {
    amountFrom: amountFrom,
    amountTo: amountTo,
    dateFrom: dateFrom,
    dateTo: dateTo,
    name: name,
  };

  let url = isSentTransactions
    ? getSentTransactionsPath
    : getReceivedTransactionsPath;

  let reqOptions = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Authorization: auth.Authorization,
    },
  };

  return await fetch(url, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchSentTransactions = async () => {
  let token = localStorage.getItem("user");

  if (token === null || token === "") return;

  let auth = authHeader();

  let reqOptions = {
    method: "get",
    headers: auth,
  };

  return await fetch(getSentTransactionsPath, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchReceivedTransactions = async () => {
  let token = localStorage.getItem("user");
  if (token === null || token === "") return;

  let auth = authHeader();
  let reqOptions = {
    method: "get",
    headers: auth,
  };

  return await fetch(getReceivedTransactionsPath, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
