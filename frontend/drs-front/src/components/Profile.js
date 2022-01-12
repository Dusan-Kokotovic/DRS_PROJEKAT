import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { getCurrentUserInfo } from "../store/userInfo/actions";
const Profile = () => {
  const user = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCurrentUserInfo()).then((response) => {
      setLoading(false);
    });
  }, []);

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
              </div>
            )}
          </h3>
        </header>
      </div>
    </React.Fragment>
  );
};

export default Profile;
