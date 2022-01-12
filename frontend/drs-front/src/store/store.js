import { applyMiddleware, createStore } from "redux";
import combinedReducers from "./combinedReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
