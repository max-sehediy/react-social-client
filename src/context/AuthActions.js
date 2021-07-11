export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const UPDATE_POST = 'UPDATE_POST'


export const LoginStart = (userCredentials) => ({
  type: LOGIN_START
})
export const LoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
})
export const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
})
export const UpdatePost = (date) => ({
  type: UPDATE_POST,
  payload: date
})