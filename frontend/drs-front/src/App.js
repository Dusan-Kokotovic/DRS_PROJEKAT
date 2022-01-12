import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Transactions from "./components/Transactions";

import { clearMessage } from "./store/message/actions";
import { history } from "./helpers/history";

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
          <Route exact path="/profile" element={<Profile />} />
          <Route
            exact
            path="/register"
            element={<Register history={history} />}
          />
          <Route
            exact
            path="/sent"
            element={<Transactions isSentTransactions={true} />}
          />
          <Route
            exact
            path="/received"
            element={<Transactions isSentTransactions={false} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
