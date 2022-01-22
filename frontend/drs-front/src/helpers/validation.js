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

export const validateNumber = (number) => {
  const re = /^[0-9\b]+$/;
  return re.test(number);
};
export const validateLetters = (text) => {
  const re = /^[A-Za-z]+$|\s/;
  return re.test(text);
};
