import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();

  const email = useRef();
  const password = useRef();

  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    if (error) {
      alert("Check your email and password");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <h1 className="loginTitle">Login</h1>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" disabled={isFetching} type="submit">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Login"
              )}
            </button>

            <button
              className="loginRegisterButton"
              onClick={() => history.push("/register")}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
