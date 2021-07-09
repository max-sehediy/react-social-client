import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const toLoginPage = () => {
    history.push("/login");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        userName: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        toLoginPage();
      } catch (error) {
        console.log(`error==>`, error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrwpper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              minLength="3"
              required
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              type="password"
              required
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign up
            </button>
            <button className="loginRegisterButton" onClick={toLoginPage}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
