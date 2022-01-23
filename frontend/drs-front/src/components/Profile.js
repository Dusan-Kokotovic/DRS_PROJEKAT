import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { getCurrentUserInfo } from "../store/userInfo/actions";
import { Form, Button, FormField } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { submitCardData } from "../store/userInfo/actions";
import { VERIFICATION_FAIL, VERIFICATION_SUCCESS } from "../store/types";

const CardDataForm = ({ toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const setMessage = (message) => {
    setErrorMessage(message);
  };

  const resetMessage = () => {
    setErrorMessage("");
  };

  const dispatch = useDispatch();

  const handleCardDataSubmit = (data) => {
    let validDate = new Date(2023, 2);
    validDate.setHours(0, 0, 0, 0);

    if (data.expirationDate === null || data.expirationDate === "") {
      setMessage("Invalid date");
      return;
    } else {
      setMessage("");
    }
    let dateData = data.expirationDate.split("-");
    let year = dateData[0];
    let month = dateData[1];

    if (year !== "2023" || month != "02") {
      setMessage("Invalid expiration date");
      return;
    } else {
      setMessage("");
    }

    let regex = "4242 4242 4242 4242";
    let matches = data.cardNumber.match(regex);

    if (matches == null || matches.length <= 0) {
      setErrorMessage("Card's number is in invalid format!");

      return;
    } else {
      resetMessage();
    }

    dispatch(submitCardData(data.cardNumber, data.expirationDate, data.pinCode))
      .then((response) => {
        toggleForm();
        dispatch({ type: VERIFICATION_SUCCESS, payload: response });
        console.log(response);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit(handleCardDataSubmit)}>
      <div>
        <Form.Field>
          <input
            className="form-control form-control-sm m-1"
            placeholder="Card Number"
            type="text"
            {...register("cardNumber", { required: true })}
          ></input>
        </Form.Field>
        {errors.cardNumber && (
          <p style={{ color: "red" }}>{errors.cardNumber}</p>
        )}
      </div>
      <div>
        <Form.Field>
          <input
            className="form-control form-control-sm m-1"
            placeholder="Pin Code"
            type="password"
            {...register("pinCode", { required: true })}
          ></input>
        </Form.Field>
        {errors.pinCode && <p style={{ color: "red" }}>{errors.pinCode}</p>}
      </div>

      <div>
        <FormField className="form-control form-control-sm m-1">
          <label className="p-1">Expiration Date</label>
          <input
            type="date"
            {...register("expirationDate", { required: true })}
          ></input>
        </FormField>
        {errors.expirationDate && (
          <p style={{ color: "red" }}>{errors.expirationDate}</p>
        )}
      </div>
      <div>
        <Button disabled={errors.length > 0} className="btn btn-primary">
          Submit Card
        </Button>
      </div>
      {errorMessage && (
        <p style={{ color: "red", margin: "1" }}>{errorMessage}</p>
      )}
    </Form>
  );
};

const Profile = ({ history }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    history.push("/");
    window.location.reload();
  }
  const user = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [showingVerificationForm, setShowingVerificationForm] = useState(false);

  const toggleForm = () => {
    setShowingVerificationForm(!showingVerificationForm);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getCurrentUserInfo()).then((response) => {
      setLoading(false);
    });
  }, []);

  const handleVerification = () => {
    toggleForm();
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {isLoading ? (
          <strong>Loading user data </strong>
        ) : (
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">
                  {user.name} {user.lastName}
                </p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.phone}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.address}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">City</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.city}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Country</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.country}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Account Balance</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{user.money} $</p>
              </div>
            </div>
            <hr />
            {user.isVerified === false && (
              <div className="row">
                <div className="col-sm-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleVerification}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {showingVerificationForm && <CardDataForm toggleForm={toggleForm} />}
    </React.Fragment>
  );
};

export default Profile;
