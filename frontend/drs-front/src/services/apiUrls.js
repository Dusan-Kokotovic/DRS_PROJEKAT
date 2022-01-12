const __baseUrl = "http://127.0.0.1:5000/api/";
const __login = "login";
const __register = "register";
const __user = "user";
const __sent_transactions = "sent";
const __received_transactions = "received";

export const login = __baseUrl + __login;
export const register = __baseUrl + __register;
export const getUserInfo = __baseUrl + __user;
export const getSentTransactions = __baseUrl + __sent_transactions;
export const getReceivedTransactions = __baseUrl + __received_transactions;
