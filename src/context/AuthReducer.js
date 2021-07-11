import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, UPDATE_POST } from "./AuthActions"

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: action.payload
      }
    case UPDATE_POST:
      return {
        ...state,
        updatePost: action.payload
      }
    default:
      return state
  }
}
export default AuthReducer