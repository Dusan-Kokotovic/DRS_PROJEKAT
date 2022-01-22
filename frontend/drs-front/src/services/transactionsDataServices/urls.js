import { __baseUrl } from "../apiUrls";

const __transactions_base = "transactions/";
const __sent_transactions = "sent";
const __received_transactions = "received";
const __send_transaction = "send";

export const getSentTransactionsPath =
  __baseUrl + __transactions_base + __sent_transactions;
export const getReceivedTransactionsPath =
  __baseUrl + __transactions_base + __received_transactions;
export const sendTransactionPath =
  __baseUrl + __transactions_base + __send_transaction;
