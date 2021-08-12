import axios from "axios";
// import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  // const username = useRef();
  // const email = useRef();
  // const password = useRef();
  // const passwordAgainRef = useRef();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordAgain, setPasswordAgain] = useState(null);
  const [match, setMatch] = useState(true);
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    // if (passwordAgain.current.value !== password.current.value) {
    // passwordAgainRef.current.setCustomValidity("Passwords don't match!");
    if (password !== passwordAgain) {
      setMatch(false);
    } else {
      setMatch(true);
      const user = {
        // username: username.current.value,
        // email: email.current.value,
        // password: password.current.value,
        username,
        email,
        password,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err.response);
      }
      console.log(user);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
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
              required
              // ref={username}
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              // ref={email}
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              // ref={password}
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              type="password"
              minLength="3"
            />
            <input
              placeholder="Password Again"
              required
              // ref={passwordAgainRef}
              onChange={(e) => setPasswordAgain(e.target.value)}
              className="loginInput"
              type="password"
            />
            <p
              style={{
                marginBottom: "7px",
                color: "darkred",
                visibility: match ? "hidden" : "visible",
              }}
            >
              The password and confirm password fields do not match.
            </p>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
