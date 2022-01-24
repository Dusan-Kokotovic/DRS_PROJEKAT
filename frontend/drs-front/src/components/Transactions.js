import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import TransactionsFilterForm from "./TransactionsFilterForm";

import {
  getSentTransactions,
  getReceivedTransactions,
  filter,
} from "../store/transactionsData/actions";
import { __baseUrl } from "../services/apiUrls";

const Transactions = ({ array, isSentTransactions }) => {
  const [filterSeen, setFilterSeen] = useState(false);
  const [render, setRender] = useState(false);
  const [sortVals, setSortVals] = useState({});
  const dispatch = useDispatch();

  const renderComponent = () => {
    setRender(!render);
  };

  useEffect(() => {
    if (array !== undefined && array.length > 0) {
      setInitialSortVals(array[0]);
    }
    console.log(sortVals);
  }, []);
  useEffect(() => {}, [render]);

  const setInitialSortVals = (transaction) => {
    let valDict = {};
    Object.keys(transaction).map((val) => {
      valDict[val] = 1;
    });
    setSortVals(valDict);
  };

  const onFilter = (
    email,
    amountFrom,
    amountTo,
    dateTo,
    dateFrom,
    isSentTransactions
  ) => {
    dispatch(
      filter(email, amountFrom, amountTo, dateFrom, dateTo, isSentTransactions)
    );
  };

  const getSum = (array) => {
    if (array !== null && array.length > 0) {
      let sum = 0;
      for (let transaction of array) {
        sum += transaction.amount;
      }
      return sum;
    }
  };

  const onFiltersClick = (e) => {
    e.preventDefault();
    setFilterSeen(!filterSeen);
  };

  const flipSortVal = (key) => {
    let newVals = sortVals;
    if (newVals[key] == -1) {
      newVals[key] = 1;
    } else if (newVals[key] == 1) {
      newVals[key] = -1;
    }
    setSortVals(newVals);
  };

  const compareBy = (key) => {
    return (a, b) => {
      if (a[key] > b[key]) return 1;
      else if (a[key] < b[key]) return -1;
      return 0;
    };
  };

  const sortBy = (key) => {
    console.log(sortVals[key]);
    if (sortVals[key] == 1) array.sort(compareBy(key));
    else array.sort(compareBy(key)).reverse();
    flipSortVal(key);
    renderComponent();
  };

  return (
    <React.Fragment>
      {array && array.length > 0 ? (
        <React.Fragment>
          <Button className="btn btn-primary" onClick={onFiltersClick}>
            Filters
          </Button>
          {filterSeen && (
            <TransactionsFilterForm
              isSentTransactions={isSentTransactions}
              fetchData={onFilter}
            />
          )}
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sortBy("name")}>
                  {isSentTransactions ? "Receivers Name" : "Senders Name"}
                </th>
                <th scope="col" onClick={() => sortBy("lastName")}>
                  {isSentTransactions
                    ? "Receivers Last Name"
                    : "Senders Last Name"}
                </th>
                <th scope="col" onClick={() => sortBy("email")}>
                  Email
                </th>
                <th scope="col" onClick={() => sortBy("amount")}>
                  Sent Amount
                </th>
                <th scope="col" onClick={() => sortBy("gas")}>
                  Gas Price
                </th>
                <th scope="col" onClick={() => sortBy("timestamp")}>
                  Timestamp
                </th>
                <th scope="col" onClick={() => sortBy("state")}>
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {array.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.name}</td>
                    <td>{transaction.lastName}</td>
                    <td>{transaction.email}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.gas}</td>
                    <td>{transaction.timestamp}</td>
                    <td>{transaction.state}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <label>Total Amount: {getSum(array)}</label>
          </div>
        </React.Fragment>
      ) : (
        <p>
          <b>No transactions yet</b>
        </p>
      )}
    </React.Fragment>
  );
};

export default Transactions;
