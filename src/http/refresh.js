import axios from "axios";
import jwt_decode from "jwt-decode";




export const refreshTokens = async () => {
  const { data } = await axios.post('/auth/login/refresh',
    {
      refreshToken: JSON.parse(localStorage.getItem('tokens')).refreshToken,
      accessToken: JSON.parse(localStorage.getItem('tokens')).accessToken,
    }
  )
  const user = jwt_decode(data.accessToken)
  localStorage.clear()
  localStorage.setItem('tokens', JSON.stringify(data))
  localStorage.setItem('user', JSON.stringify(user.user))
  return data.accessToken
}