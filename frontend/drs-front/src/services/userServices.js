import {
  login,
  register,
  edit,
  getUserInfo,
  getSentTransactions,
  getReceivedTransactions,
} from "./apiUrls";
import { authHeader } from "./auth-header";

export const filterTransactions = async (
  name,
  amountFrom,
  amountTo,
  dateFrom,
  dateTo,
  isSentTransactions
) => {
  let token = localStorage.getItem("user");

  if (token == null || token === "") return;

  let auth = authHeader();
  let data = {
    amountFrom: amountFrom,
    amountTo: amountTo,
    dateFrom: dateFrom,
    dateTo: dateTo,
    name: name,
  };

  let url = isSentTransactions ? getSentTransactions : getReceivedTransactions;

  let reqOptions = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Authorization: auth.Authorization,
    },
  };

  return await fetch(url, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchSentTransactions = async () => {
  let token = localStorage.getItem("user");

  if (token === null || token === "") return;

  let auth = authHeader();

  let reqOptions = {
    method: "get",
    headers: auth,
  };

  return await fetch(getSentTransactions, reqOptions)
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

export const fetchReceivedTransactions = async () => {
  let token = localStorage.getItem("user");
  if (token === null || token === "") return;

  let auth = authHeader();
  let reqOptions = {
    method: "get",
    headers: auth,
  };

  return await fetch(getReceivedTransactions, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const userLogin = async (email, password) => {
  let token = localStorage.getItem("user");

  if (token != null && token != "") return;

  let data = { email: email, password: password };
  let reqOptions = {
    method: "post",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  return await fetch(login, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then(({ token }) => {
      localStorage.setItem("user", token);
    })
    .catch((error) => {
      let { msg } = error.json();
      console.log(msg);
    });
};

export const userLogout = () => {
  localStorage.setItem("user", "");
};

export const _getCurrentUserInfo = async () => {
  let authorization = authHeader();

  let reqOptions = {
    method: "get",
    headers: authorization,
  };

  return await fetch(getUserInfo, reqOptions)
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

export const userRegister = async (
  email,
  password,
  name,
  last_name,
  address,
  city,
  country,
  phone
) => {
  let token = localStorage.getItem("user");

  if (token != null && token != "") return;

  let data = {
    email: email,
    password: password,
    name: name,
    lastName: last_name,
    address: address,
    city: city,
    country: country,
    phone: phone,
  };

  let reqOptions = {
    method: "post",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  return await fetch(register, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      let { msg } = error.json();
      console.log(msg);
    });
};

export const userEdit = async (
  email,
  name,
  last_name,
  address,
  city,
  country,
  phone,
  password
) => {

  // ovo iskreno nisam skontao kako radi, ali u sustini morao sam da zakomentarisem da bi stigao do bekenda
  // let token = localStorage.getItem("user");
  // if (token != null && token != "") return;

  let data = {
    email: email,
    name: name,
    lastName: last_name,
    address: address,
    city: city,
    country: country,
    phone: phone,
    password: password
  };

  let reqOptions = {
    method: "post",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  return await fetch(edit, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      let { msg } = error.json();
      console.log(msg);
    });
};
