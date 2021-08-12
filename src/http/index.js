import axios from 'axios'
import jwt_decode from "jwt-decode";
import { refreshTokens } from './refresh';


export const axiosJWT = axios.create({
  // baseURL: 'api'
})

axiosJWT.interceptors.request.use(async (config) => {
  let currentDate = Date.now()
  const decodetToken = jwt_decode(JSON.parse(localStorage.getItem('tokens')).accessToken)

  if (decodetToken.exp * 1000 < currentDate) {
    const newAccessToken = await refreshTokens()
    config.headers['authorization'] = `Bearer ${newAccessToken}`
  } else {
    config.headers['authorization'] = `Bearer ${JSON.parse(localStorage.getItem('tokens')).accessToken}`
  }
  return config
},
  err => { return Promise.reject(err) }
)