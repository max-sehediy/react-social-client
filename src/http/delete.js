import { $authHost } from ".";


export const deleteUser = async () => {
  try {
    const { data } = await $authHost.delete('/auth/login/' + '60ff062094b2971c0c7d91d8',
      {
        data: {
          refreshToken: JSON.parse(localStorage.getItem('tokens')).refreshToken,
          accessToken: JSON.parse(localStorage.getItem('tokens')).accessToken,
        }
      }
    )
    return data
  } catch (error) {
console.log(error.response.data)    
  }
}