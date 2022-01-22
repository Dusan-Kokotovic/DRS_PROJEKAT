import {
    COIN_MARKET_DATA_FETCH_SUCCESS,
    COIN_MARKET_DATA_FETCH_FAIL
  } from "../types";

  import {
    getCoinsMarket
  } from "../../services/coinMarketServices/services";

  export const GetCoins = () =>(
    dispatch
  ) => {
    return getCoinsMarket ().then(
      (response) => {
        dispatch({type: COIN_MARKET_DATA_FETCH_SUCCESS});
        return Promise.resolve();
      },
      (error) => {
        dispatch({type : COIN_MARKET_DATA_FETCH_FAIL});
        console.log(error);
        return Promise.reject();
      }
    )
  
  }