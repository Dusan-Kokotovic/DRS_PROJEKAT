import { combineReducers } from "redux";
import auth from "./auth/reducer";
import message from "./message/reducer";
import userInfo from "./userInfo/reducer";
import transactionsData from "./transactionsData/reducer";

export default combineReducers({ auth, message, userInfo, transactionsData });
