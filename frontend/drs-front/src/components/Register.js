import React, { useEffect, useState } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button } from "semantic-ui-react";
import Header from "./Header";
import {
  validateEmail,
  validateNumber,
  validateLetters,
} from "../helpers/validation";

import { registerAction } from "../store/auth/actions";
import { clearMessage } from "../store/message/actions";

const Register = ({ history }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    history.push("/");
    window.location.reload();
  }

  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");
  const msg = useSelector((state) => state.message.message);
  let isError = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(clearMessage());
    if (!validateEmail(data.email)) {
      setEmailError("Email is not valid");
      //return;
      isError = true;
    } else {
      setEmailError("");
    }

    if (!validateLetters(data.city)) {
      setCityError("City is not valid");
      //return;
      isError = true;
    } else {
      setCityError("");
    }

    if (!validateLetters(data.country)) {
      setCountryError("Country is not valid");
      //return;
      isError = true;
    } else {
      setCountryError("");
    }

    if (!validateNumber(data.phone)) {
      setNumberError("Number is not valid");
      //return;
      isError = true;
    } else {
      setNumberError("");
    }
    if (isError) {
      return;
    }

    dispatch(
      registerAction(
        data.email,
        data.password,
        data.name,
        data.lastName,
        data.address,
        data.city,
        data.country,
        data.phone
      )
    ).then(() => {
      history.push("/login");
      window.location.reload();
    });
  };

  return (
    <React.Fragment>
      <Header />
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          margin: "auto",
        }}
        className="card bg-light"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field className="m-3 p-1">
            <input
              placeholder="Name"
              type="text"
              {...register("name", { required: true, maxLength: 25 })}
            />
          </Form.Field>
          {errors.name && (
            <p style={{ color: "red" }} className="m-3 p-1">
              Please enter your name
            </p>
          )}

          <Form.Field className="m-3 p-1">
            <input
              id="inputLastName"
              placeholder="Last Name"
              {...register("lastName", { required: true, maxLength: 30 })}
            />
          </Form.Field>
          {errors.lastName && (
            <p style={{ color: "red" }} className="m-3 p-1">
              Please enter your last name
            </p>
          )}
          <Form.Field className="m-3 p-1">
            <input
              type="email"
              id="inputEmail"
              placeholder="email"
              {...register("email", { required: true })}
            />
          </Form.Field>
          {errors.email && (
            <p style={{ color: "red" }} className="m-3 p-1">
              Please enter your email
            </p>
          )}
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          <Form.Field className="m-3 p-1">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 30,
              })}
            />
          </Form.Field>
          {errors.password && (
            <p style={{ color: "red" }} className="m-3 p-1">
              Password must be between 6 and 30 characters
            </p>
          )}
          <Form.Field className="m-3 p-1">
            <input
              type="text"
              placeholder="Veselina Maslese 38"
              {...register("address", { required: true })}
            />
          </Form.Field>
          {errors.address && (
            <p style={{ color: "red" }} className="m-3 p-1">
              Please enter your address
            </p>
          )}
          <Form.Field className="m-3 p-1">
            <input
              type="text"
              placeholder="Novi Sad"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <p style={{ color: "red" }} className="m-3 p-1">
                Please enter your city
              </p>
            )}
            {cityError && <p style={{ color: "red" }}>{cityError}</p>}
          </Form.Field>
          <Form.Field className="m-3 p-1">
            <input
              type="text"
              placeholder="Country"
              {...register("country", { required: true })}
            />
            {errors.country && (
              <p style={{ color: "red" }} className="m-3 p-1">
                Please enter your country
              </p>
            )}
            {countryError && <p style={{ color: "red" }}>{countryError}</p>}
          </Form.Field>
          <Form.Field className="m-3 p-1">
            <input
              type="text"
              placeholder="Mobile"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <p style={{ color: "red" }} className="m-3 p-1">
                Please enter your mobile phone
              </p>
            )}
            {numberError && <p style={{ color: "red" }}>{numberError}</p>}
          </Form.Field>
          <Button type="submit" className="btn btn-primary m-3   p-1">
            Register
          </Button>
        </Form>
      </div>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </React.Fragment>
  );
};

export default Register;
