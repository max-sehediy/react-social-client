import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { loginCall } from "../../store-redux/user/user";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const email = useRef();
  // const password = useRef();
  // const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      await dispatch(loginCall(data));
      history.push("/");
    } catch (error) {
      console.log(error.response);
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
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              // ref={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="3"
              className="loginInput"
              // ref={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="loginButton"
              type="submit"
              // disabled={isFetching}
            >
              {user.pending ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
