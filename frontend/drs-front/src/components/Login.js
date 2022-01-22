import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/actions";
import { setMessage } from "../store/message/actions";
import { validateEmail, validatePassword } from "../helpers/validation";
import Header from "./Header";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = ({ history }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    history.push("/");
    window.location.reload();
  }
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const username = e.target.value;
    setEmail(username);
  };

  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateEmail(email) && validatePassword(password)) {
      dispatch(login(email, password)).then((response) => {
        setEmail("");
        setPassword("");
        setLoading(false);

        history.push("/profile");
        window.location.reload();
      });
    } else {
      dispatch(setMessage("Invalid email or password"));
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="col-md-12">
        <div className="card card-container">
          <form onSubmit={handleLogin}>
            <div className="m-1">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
                placeholder="Email"
              />
            </div>
            <div className="m-1">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onPasswordChange}
                validations={[required]}
                placeholder="Password"
              />
            </div>
            <div className="m-1">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
