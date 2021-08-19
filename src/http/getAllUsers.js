import { $authHost } from ".";

export const allUsers = async () => {
  try {
    const { data } = await $authHost.get('/users/all')
    return data
  } catch (error) {
    
  }
}