import {
  getUserInfoPath,
  userVerificationPath,
  getUserCoinsDataPath,
  withdrawMoneyPath,
  ExchangeMoneyPath
} from "./urls";
import { authHeader } from "../auth-header";


export const exchangeMoney = async (amount) =>{
  let token = localStorage.getItem("user");

  if(token === null || token === "")return;

  let data = {
    amount : amount
  }

  let reqOptions = {
    method : "post",
    body : JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Authorization: token,
    }
  }

  return fetch(ExchangeMoneyPath, reqOptions)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    return json;
  })
  .catch((error) => {
    console.log(error);
  });
}

export const withdrawMoney = async (amount) =>{
  let token = localStorage.getItem("user");

  if(token === null || token === "") return;

  let data = {
    amount : amount
  };

  let reqOptions = {
    method : "post",
    body : JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  }

  return fetch(withdrawMoneyPath, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
}


export const getUserCoinsData = async () => {
  let token = localStorage.getItem("user");

  if (token === null || token === "") return;

  let tokenHeader = authHeader();

  let reqOptions = {
    method: "get",
    headers: tokenHeader,
  };

  return fetch(getUserCoinsDataPath, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const _getCurrentUserInfo = async () => {
  let authorization = authHeader();

  let reqOptions = {
    method: "get",
    headers: authorization,
  };

  return await fetch(getUserInfoPath, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const verifyUser = async (cardNumber, expirationDate, pinCode) => {
  let token = localStorage.getItem("user");

  if (token === null || token === "") return;

  let data = {
    cardNumber: cardNumber,
    expirationDate: expirationDate,
    pinCode: pinCode,
  };

  let reqOptions = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  };

  return fetch(userVerificationPath, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
};
