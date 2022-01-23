import { __baseUrl } from "../apiUrls";

const __user_base = "user/";
const __login = "login";
const __register = "register";
const __edit = "edit";

export const loginPath = __baseUrl + __user_base + __login;
export const registerPath = __baseUrl + __user_base + __register;
export const editPath = __baseUrl + __user_base + __edit;
