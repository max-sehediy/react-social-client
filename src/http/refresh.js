import jwt_decode from "jwt-decode";
import { $host } from ".";


export const refreshTokens = async () => {
  const tokens = JSON.parse(localStorage.getItem('tokens'))
  try {
    const { data } = await $host.post('/auth/login/refresh',
      {
        refreshToken: tokens.refreshToken,
        accessToken: tokens.accessToken,
        id: tokens.id
      }
    )
    const { user } = jwt_decode(data.accessToken)
    localStorage.clear()
    localStorage.setItem('tokens', JSON.stringify(data))
    localStorage.setItem('user', JSON.stringify(user))
    return data.accessToken

  } catch (error) {
    console.log('refresh=>', error.response)
  }
}