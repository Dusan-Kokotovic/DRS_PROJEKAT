import { loginPath, registerPath } from "./urls";

export const userLogout = () => {
  localStorage.setItem("user", "");
};

export const userLogin = async (email, password) => {
  let token = localStorage.getItem("user");

  if (token !== null && token !== "") return;

  let data = { email: email, password: password };
  let reqOptions = {
    method: "post",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  };

  return await fetch(loginPath, reqOptions)
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

  if (token !== null && token !== "") return;

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

  return await fetch(registerPath, reqOptions)
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
