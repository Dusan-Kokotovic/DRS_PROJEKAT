const __baseUrl = "http://127.0.0.1:5000/api/";

const __user_base = "user/";
const __transactions_base = "transactions/";

const __login = "login";
const __register = "register";
const __sent_transactions = "sent";
const __received_transactions = "received";

export const login = __baseUrl + __user_base + __login;
export const register = __baseUrl + __user_base + __register;
export const getUserInfo = __baseUrl + __user_base;
export const getSentTransactions =
  __baseUrl + __transactions_base + __sent_transactions;
export const getReceivedTransactions =
  __baseUrl + __transactions_base + __received_transactions;
