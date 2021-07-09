import axios from "axios"
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "./context/AuthActions"

export const loginCall = async (userCredential, dispach) => {
  dispach({ type: LOGIN_START })
  try {
    const { data } = await axios.post('auth/login', userCredential)
    dispach({ type: LOGIN_SUCCESS, payload: data })
  } catch (error) {
    dispach({ type: LOGIN_FAILURE, payload: error.message })
  }
}