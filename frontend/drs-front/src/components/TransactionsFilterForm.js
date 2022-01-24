import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Form, Button, FormField } from "semantic-ui-react";

const TransactionsFilterForm = ({ isSentTransactions, fetchData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFilter = (data) => {
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

export default TransactionsFilterForm;
