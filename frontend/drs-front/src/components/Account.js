import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCoinData } from "../store/userCoinData/actions";

const Coin = ({ price, amountHeld, coinId, name, index, change, symbol }) => {
  const heldValue = price * amountHeld;

  return (
    <tr scope="row" key={coinId}>
      <th scope="col">{index + 1}</th>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{price.toFixed(2)} $</td>
      <td>{change.toFixed(2)} %</td>
      <td>{amountHeld}</td>
      <td>{(amountHeld * price).toFixed(4)} $</td>
    </tr>
  );
};

const CoinList = ({ coinDataList }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Symbol</th>
          <th scope="col">Price</th>
          <th scope="col">24h Change</th>
          <th scope="col">Coins Held</th>
          <th scope="col">Total Value</th>
        </tr>
      </thead>
      <tbody>
        {coinDataList.map((x, index) => {
          return (
            <Coin
              index={index}
              price={x.price}
              amountHeld={x.amountHeld}
              coinId={x.coinId}
              name={x.coinName}
              symbol={x.symbol}
              change={x.percentChange24h}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const Account = ({ history }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    history.push("/");
    window.location.reload();
  }
  const usersCoins = useSelector((state) => state.userCoinData);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserCoinData()).then((success) => {
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
        usersCoins && <CoinList coinDataList={usersCoins} />
      )}
    </React.Fragment>
  );
};

export default Account;
