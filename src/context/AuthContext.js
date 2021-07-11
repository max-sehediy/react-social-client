import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
  updatePost: null
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContexProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  return (
    <AuthContext.Provider value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      updatePost: state.updatePost,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
}