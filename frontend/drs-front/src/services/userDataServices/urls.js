import { __baseUrl } from "../apiUrls";

const __user_base = "user/";
const _verifyUser = "verify";
const _coins_base = "coins/";

export const getUserInfoPath = __baseUrl + __user_base;
export const userVerificationPath = __baseUrl + __user_base + _verifyUser;
export const getUserCoinsDataPath = __baseUrl + _coins_base + "user";
