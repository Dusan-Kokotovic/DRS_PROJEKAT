import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { Form, Button, FormField } from "semantic-ui-react";
import { useForm } from "react-hook-form";

import {
  getSentTransactions,
  getReceivedTransactions,
  filter,
} from "../store/transactionsData/actions";

const FilterForm = ({ isSentTransactions, fetchData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFilter = (data) => {
    console.log({ data });
    fetchData(
      data.name,
      data.amountFrom,
      data.amountTo,
      data.dateFrom,
      data.dateTo,
      isSentTransactions
    );
  };

  return (
    <Form onSubmit={handleSubmit(onFilter)} className="form-group">
      <div style={{ float: "left", margin: 4 }}>
        <FormField>
          <input
            placeholder={isSentTransactions ? "Receivers Name" : "Senders Name"}
            type="text"
            {...register("name")}
          />
        </FormField>
      </div>

      <div style={{ float: "left", margin: 4 }}>
        <FormField>
          <input
            placeholder="Amount From"
            type="text"
            {...register("amountFrom")}
          />
        </FormField>
        <FormField>
          <input
            placeholder="Amount To"
            type="text"
            {...register("amountTo")}
          />
        </FormField>
      </div>
      <div style={{ float: "left", margin: 4 }}>
        <FormField>
          <label>Date From</label>
          <input
            type="date"
            placeholder="Timestamp From"
            {...register("dateFrom")}
          />
        </FormField>
        <FormField>
          <label className="label">Date To </label>
          <input
            type="date"
            placeholder="Timestamp To"
            {...register("dateTo")}
          />
        </FormField>
      </div>
      <div style={{ float: "left", margin: 4 }}>
        <Button type="submit" className="btn btn-primary">
          Filter
        </Button>
      </div>
    </Form>
  );
};

const Transactions = ({ isSentTransactions }) => {
  const transactions = useSelector((state) => state.transactionsData);
  const [isLoading, setLoading] = useState(false);
  const [filterSeen, setFilterSeen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (isSentTransactions) {
      dispatch(getSentTransactions());
    } else {
      dispatch(getReceivedTransactions());
    }
    setLoading(false);
  }, [isSentTransactions]);

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

  const getSum = () => {
    if (transactions !== null && transactions.length > 0) {
      let sum = 0;
      for (let transaction of transactions) {
        sum += transaction.amount;
      }
      return sum;
    }
  };

  const onFiltersClick = (e) => {
    e.preventDefault();
    setFilterSeen(!filterSeen);
  };

  return (
    <React.Fragment>
      <Header />
      <Button className="btn btn-primary" onClick={onFiltersClick}>
        Filters
      </Button>
      {filterSeen && (
        <FilterForm
          isSentTransactions={isSentTransactions}
          fetchData={onFilter}
        />
      )}

      {transactions && transactions.length > 0 && (
        <React.Fragment>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  {isSentTransactions ? "Receivers Name" : "Senders Name"}
                </th>
                <th scope="col">
                  {isSentTransactions
                    ? "Receivers Last Name"
                    : "Senders Last Name"}
                </th>
                <th scope="col">Email</th>
                <th scope="col">Amount</th>
                <th scope="col">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.name}</td>
                    <td>{transaction.lastName}</td>
                    <td>{transaction.email}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <label>Total Amount: {getSum(transactions)}</label>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Transactions;
