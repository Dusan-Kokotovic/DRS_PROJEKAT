import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { Form, Button } from "semantic-ui-react";
import { GetCoins } from "../store/coinMarket/actions";
import { ExchangeAmount } from "../store/userInfo/actions";
import { useForm } from "react-hook-form";
import { validateNumber } from "../helpers/validation";
import { clearMessage } from "../store/message/actions";

const Coin = ({ price, amountHeld, coinId, symbol }) => {
  return (
    <option
      value={`${price},${coinId}`}
      key={coinId}
      data-amount={amountHeld}
      data-price={price}
    >
      {symbol} {price.toFixed(2)} $
    </option>
  );
};

const CoinList = ({ coinDataList, register }) => {
  return (
    <select className="form-select form-select w-100" {...register("coinData")}>
      <option value={"0,-1"} selected>
        Select a coin
      </option>
      {coinDataList.map((x) => {
        return (
          <Coin
            price={x.price}
            amountHeld={x.amountHeld}
            coinId={x.externApiId}
            symbol={x.symbol}
          />
        );
      })}
    </select>
  );
};

const Exchange = ({ history }) => {
  const coins = useSelector((state) => state.coinMarket);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [amountError, setAmountError] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const msg = useSelector((state) => state.message.message);

  if (!isLoggedIn) {
    history.push("/");
    window.location.reload();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(clearMessage());
    setLoading(true);
    dispatch(GetCoins()).then(() => {
      setLoading(false);
    });
  }, []);

  const onSubmit = (data) => {
    dispatch(clearMessage());
    let splitData = data.coinData.split(",");
    let price = Number(splitData[0]);
    let coinId = Number(splitData[1]);

    if (!validateNumber(data.amount)) {
      setMessage("Amount is not a valid number");
      return;
    } else {
      setAmountError("");
    }

    if (coinId === -1) {
      setMessage("Coin not selected");
      return;
    } else {
      setMessage("");
    }
    dispatch(ExchangeAmount(Number(data.amount), coinId, price));
  };

  return (
    <>
      <Header />
      <div>
        {isLoading ? (
          <strong>Loading coins market </strong>
        ) : (
          <React.Fragment>
            <div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field className="m-3 p-1">
                  <input
                    placeholder="$100"
                    type="text"
                    {...register("amount", { required: true, maxLength: 25 })}
                  />
                </Form.Field>
                {errors.amount && (
                  <p style={{ color: "red" }} className="m-3 p-1">
                    Please enter amount
                  </p>
                )}
                {amountError && <p style={{ color: "red" }}>{amountError}</p>}
                <Form.Field className="m-2">
                  <CoinList coinDataList={coins} register={register} />
                </Form.Field>
                {errors.amount && (
                  <p style={{ color: "red" }} className="m-2">
                    Please select coin
                  </p>
                )}
                {message && <p style={{ color: "red" }}>{message}</p>}
                <Button type="submit" className="btn btn-primary m-2">
                  Buy coins
                </Button>
              </Form>
            </div>
            {msg && <p style={{ color: "gray" }}>{msg}</p>}
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default Exchange;
