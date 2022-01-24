import Transactions from "./Transactions";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";

import { getReceivedTransactions } from "../store/transactionsData/actions";

const ReceivedTransactions = ({ history }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    history.push("/");
    window.location.reload();
  }
  const transactions = useSelector((state) => state.transactionsData);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getReceivedTransactions()).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      <Header />
      {isLoading ? (
        <p>
          <b>Loading data...</b>
        </p>
      ) : (
        <Transactions isSentTransactions={true} array={transactions} />
      )}
    </React.Fragment>
  );
};

export default ReceivedTransactions;
