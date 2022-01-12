import validator from "validator";

export const validateEmail = (email) => {
  if (validator.isEmail(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  return (password !== null && password !== "") || password.length >= 6;
};

export const required = (value) => {
  return value !== null && value !== "";
};
