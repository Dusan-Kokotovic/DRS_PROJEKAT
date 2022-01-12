import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../store/auth/actions";
import { useSelector } from "react-redux";
const Header = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <React.Fragment>
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={logout}>
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sent">
                  Sent Transactions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/received">
                  Received Transactions
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
