import jwt_decode from "jwt-decode";
import { $host } from "./http";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await $host.post("/auth/login", userCredential);
    const { data } = response
    const user = jwt_decode(data.accessToken)
    localStorage.setItem('tokens', JSON.stringify(data))
    localStorage.setItem('user', JSON.stringify(user.user))
    dispatch({ type: "LOGIN_SUCCESS", payload: user.user });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

