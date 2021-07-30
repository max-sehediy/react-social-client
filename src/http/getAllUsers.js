import { axiosJWT } from ".";

export const allUsers = async () => {
  try {
    const { data } = await axiosJWT.get('/users/all')
    return data
  } catch (error) {
    
  }
}