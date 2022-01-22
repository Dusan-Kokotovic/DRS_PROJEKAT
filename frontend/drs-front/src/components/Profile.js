import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { getCurrentUserInfo } from "../store/userInfo/actions";
import { editAction } from "../store/auth/actions";
const Profile = () => {
  const user = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCurrentUserInfo()).then((response) => {
      setLoading(false);
    });
  }, []);
  
  const initEdit = () => {
    console.log('edit is initiated');
    setIsEditing(!isEditing);
  }

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
  }

  const discardChanges = () => {
    console.log('discarded changes');
    console.log(document.getElementById("nameInput").value);
    setIsEditing(false);
    window.location.reload();
  }
  
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
                  <p style={{"fontWeight": "450"}}>{user.email}</p>
                </div>
              </div>
              <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Name</p>
                  </div>
                  <div className="col-sm-9">
                    <input defaultValue={user.name} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="nameInput" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Last Name</p>
                  </div>
                  <div className="col-sm-9">
                    <input defaultValue={user.lastName} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="lastNameInput" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <input defaultValue={user.phone} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="phoneInput" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <input defaultValue={user.address} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="addressInput" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">City</p>
                  </div>
                  <div className="col-sm-9">
                    <input defaultValue={user.city} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="cityInput" />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Country</p>
                  </div>
                  <div className="col-sm-9">
                    <input defaultValue={user.country} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="countryInput" />
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
                        <input defaultValue={user.password} style={isEditing ? {"fontWeight": "450"} : {"pointerEvents": "none", "border": "none", "fontWeight": "450"}} id="passwordInput" />
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
            {isEditing
            ? 
            <button className="btn btn-danger" onClick={() => discardChanges()}>
              Discard Changes
            </button>
            :
            <button className="btn btn-primary" onClick={() => initEdit()}>
              Edit Data
            </button>
            }
            {isEditing && (
              <button className="btn btn-success" onClick={() => saveChanges()}>
              Save Changes
              </button>
            )}
          </h3>
        </header>
      </div>
    </React.Fragment>
  );
};

export default Profile;
