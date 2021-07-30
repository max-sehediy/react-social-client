import { axiosJWT } from ".";



export const logout = async () => {

  try {
    const { data } = await axiosJWT.post("/auth/login/logout", {
      data: {
        refreshToken: localStorage.getItem("tokens").refreshToken,
      },
    });
    if (data.logout) {
      localStorage.clear()
      document.location.reload()
      return
    }
    else return data
  } catch (error) {
    console.log(`error=>`, error.response.data);
  }
};