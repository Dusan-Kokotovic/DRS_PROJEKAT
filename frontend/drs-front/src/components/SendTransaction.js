import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCoinData } from "../store/userCoinData/actions";
import Header from "./Header";
import { Form, Button } from "semantic-ui-react";
import { set, useForm } from "react-hook-form";
import { validateEmail } from "../helpers/validation";
import { send } from "../store/transactionsData/actions";

const Coin = ({ price, amountHeld, coinId, symbol }) => {
  return (
    <option value={coinId} key={coinId} data-amount={amountHeld}>
      {symbol}
    </option>
  );
};

const CoinList = ({ coinDataList, register }) => {
  return (
    <select className="form-select form-select w-100" {...register("coinId")}>
      <option value={-1} selected>
        Select a coin
      </option>
      {coinDataList.map((x) => {
        return (
          <Coin
            price={x.price}
            amountHeld={x.amountHeld}
            coinId={x.coinId}
            symbol={x.symbol}
          />
        );
      })}
    </select>
  );
};

const SendTransaction = ({ history }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    history.push("/");
    window.location.reload();
  }
  const coins = useSelector((state) => state.userCoinData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserCoinData()).then((success) => {
      setIsLoading(false);
    });
  }, []);

  const onFormSubmit = (data) => {
    let email = data.receiver;
    console.log(data);
    if (!validateEmail(email)) {
      setMessage("Email is invalid");
      return;
    } else {
      setMessage("");
    }

    let reg = "[1-9][0-9]*";
    let matches = data.amount.match(reg);
    if (matches === undefined || matches === null || matches.length <= 0) {
      setMessage("Amount has to be a number");
      return;
    } else {
      setMessage("");
    }

    if (data.coinId === "-1") {
      setMessage("Choose a coin");
      return;
    } else {
      setMessage("");
    }

    dispatch(
      send(data.receiver, Number(data.amount), Number(data.coinId))
    ).then((response) => {
      console.log("Started a transaction");
    });
  };

  return (
    <React.Fragment>
      <Header />
      {isLoading ? (
        <p>
          <b>Loading data...</b>
        </p>
      ) : (
        coins && (
          <React.Fragment>
            <Form
              className="form-group m-2"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <Form.Field className="m-2">
                <input
                  type="email"
                  placeholder="Receivers email"
                  className="form-control"
                  {...register("receiver", { required: true })}
                ></input>
              </Form.Field>
              <Form.Field className="m-2">
                <CoinList coinDataList={coins} register={register} />
              </Form.Field>
              <Form.Field className="m-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Amount"
                  {...register("amount", { required: true })}
                ></input>
              </Form.Field>
              <Button className="btn btn-primary m-2">Send</Button>
            </Form>
            {message && <p style={{ color: "red" }}>{message}</p>}
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
};

export default SendTransaction;
