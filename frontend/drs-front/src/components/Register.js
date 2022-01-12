import React, { useState } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button } from "semantic-ui-react";
import Header from "./Header";
import { validateEmail } from "../helpers/validation";

import { registerAction } from "../store/auth/actions";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (!validateEmail(data.email)) {
      setEmailError("Email is not valid");
      return;
    } else {
      setEmailError("");
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
    ).then((response) => {
      console.log(response);
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
          </Form.Field>
          <Button type="submit" className="btn btn-primary m-3   p-1">
            Register
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Register;