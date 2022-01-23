import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { getCurrentUserInfo } from "../store/userInfo/actions";
import { Form, Button, FormField } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { submitCardData } from "../store/userInfo/actions";
import { editAction } from "../store/auth/actions";
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
  const [isEditing, setIsEditing] = useState(false);

  const toggleForm = () => {
    setShowingVerificationForm(!showingVerificationForm);
  };

  const initEdit = () => {
    console.log("edit is initiated");
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    dispatch(
      editAction(
        user.email,
        document.getElementById("nameInput").value,
        document.getElementById("lastNameInput").value,
        document.getElementById("addressInput").value,
        document.getElementById("cityInput").value,
        document.getElementById("countryInput").value,
        document.getElementById("phoneInput").value,
        document.getElementById("passwordInput").value
      )
    ).then((response) => {
      console.log(response);
      // window.location.reload();
      setIsEditing(false);
    });
  };

  const discardChanges = () => {
    console.log("discarded changes");
    console.log(document.getElementById("nameInput").value);
    setIsEditing(false);
    window.location.reload();
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
        <header className="jumbotron">
          <h3>
            {isLoading ? (
              <strong>Loading user data </strong>
            ) : (
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p style={{ fontWeight: "450" }}>{user.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <input
                      defaultValue={user.name}
                      style={
                        isEditing
                          ? { fontWeight: "450" }
                          : {
                              pointerEvents: "none",
                              border: "none",
                              fontWeight: "450",
                            }
                      }
                      id="nameInput"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Last Name</p>
                  </div>
                  <div className="col-sm-9">
                    <input
                      defaultValue={user.lastName}
                      style={
                        isEditing
                          ? { fontWeight: "450" }
                          : {
                              pointerEvents: "none",
                              border: "none",
                              fontWeight: "450",
                            }
                      }
                      id="lastNameInput"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <input
                      defaultValue={user.phone}
                      style={
                        isEditing
                          ? { fontWeight: "450" }
                          : {
                              pointerEvents: "none",
                              border: "none",
                              fontWeight: "450",
                            }
                      }
                      id="phoneInput"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <input
                      defaultValue={user.address}
                      style={
                        isEditing
                          ? { fontWeight: "450" }
                          : {
                              pointerEvents: "none",
                              border: "none",
                              fontWeight: "450",
                            }
                      }
                      id="addressInput"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">City</p>
                  </div>
                  <div className="col-sm-9">
                    <input
                      defaultValue={user.city}
                      style={
                        isEditing
                          ? { fontWeight: "450" }
                          : {
                              pointerEvents: "none",
                              border: "none",
                              fontWeight: "450",
                            }
                      }
                      id="cityInput"
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Country</p>
                  </div>
                  <div className="col-sm-9">
                    <input
                      defaultValue={user.country}
                      style={
                        isEditing
                          ? { fontWeight: "450" }
                          : {
                              pointerEvents: "none",
                              border: "none",
                              fontWeight: "450",
                            }
                      }
                      id="countryInput"
                    />
                  </div>
                </div>
                <hr />
                {isEditing && (
                  <>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">New Password</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          defaultValue={user.password}
                          style={
                            isEditing
                              ? { fontWeight: "450" }
                              : {
                                  pointerEvents: "none",
                                  border: "none",
                                  fontWeight: "450",
                                }
                          }
                          id="passwordInput"
                        />
                      </div>
                    </div>
                    <hr />
                    {/* <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Confirm Password</p>
                      </div>
                      <div className="col-sm-9">
                        <input defaultValue={user.password} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="passwordInput" />
                      </div>
                    </div>
                    <hr /> */}
                  </>
                )}
              </div>
            )}
            {isEditing ? (
              <button
                className="btn btn-danger"
                onClick={() => discardChanges()}
              >
                Discard Changes
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => initEdit()}>
                Edit Data
              </button>
            )}
            {isEditing && (
              <button className="btn btn-success" onClick={() => saveChanges()}>
                Save Changes
              </button>
            )}
          </h3>
        </header>
      </div>
      {showingVerificationForm && <CardDataForm toggleForm={toggleForm} />}
    </React.Fragment>
  );
};

export default Profile;
