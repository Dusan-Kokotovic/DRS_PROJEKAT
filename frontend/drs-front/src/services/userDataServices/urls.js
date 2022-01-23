import { __baseUrl } from "../apiUrls";

const __user_base = "user/";
const _verifyUser = "verify";
const _coins_base = "coins/";
const _deposit = "deposit";
const _exchange = "exchange";

export const getUserInfoPath = __baseUrl + __user_base;
export const userVerificationPath = __baseUrl + __user_base + _verifyUser;
export const getUserCoinsDataPath = __baseUrl + _coins_base + "user";
export const depositMoneyPath = __baseUrl + __user_base + _deposit;
export const ExchangeMoneyPath = __baseUrl + __user_base + _exchange;