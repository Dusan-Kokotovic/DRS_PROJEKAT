import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Transactions from "./components/Transactions";
import Account from "./components/Account";
import { clearMessage } from "./store/message/actions";
import { history } from "./helpers/history";
import SendTransaction from "./components/SendTransaction";
import Error from "./components/Error";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logOut());
  };

  return (
    <BrowserRouter history={history}>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login history={history} />} />
          <Route
            exact
            path="/profile"
            element={<Profile history={history} />}
          />
          <Route
            exact
            path="/register"
            element={<Register history={history} />}
          />
          <Route
            exact
            path="/sent"
            element={
              <Transactions isSentTransactions={true} history={history} />
            }
          />
          <Route
            exact
            path="/received"
            element={
              <Transactions isSentTransactions={false} history={history} />
            }
          />
          <Route
            exact
            path="/account"
            element={<Account history={history} />}
          />
          <Route
            exact
            path="/send"
            element={<SendTransaction history={history} />}
          />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
