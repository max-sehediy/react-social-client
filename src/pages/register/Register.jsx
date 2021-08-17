import axios from "axios";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordAgain, setPasswordAgain] = useState(null);
  const [match, setMatch] = useState(true);
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      setMatch(false);
    } else {
      setMatch(true);
      const user = {
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
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              type="password"
              minLength="3"
            />
            <input
              placeholder="Password Again"
              required
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
