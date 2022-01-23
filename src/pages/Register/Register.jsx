import axios from "../../axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import "./Register.css";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
        alert("This email already exists in our database");
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <h1 className="registerTitle">Signup</h1>
            <input
              placeholder="Username (It should be unique)"
              type="text"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="registerInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              className="registerInput"
              minLength="6"
            />

            <input
              placeholder="Confirm Password"
              type="password"
              required
              ref={confirmPassword}
              className="registerInput"
              minLength="6"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button
              className="registerRegisterButton"
              onClick={() => history.push("/login")}
            >
              Log into your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
