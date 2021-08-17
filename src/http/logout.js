import axios from "axios";



export const logout = async () => {
  try {
    const { data } = await axios.post("/auth/login/logout", {
      data: {
        id: JSON.parse(localStorage.getItem('tokens')).id
      },
    });
    if (data.logout) {
      localStorage.clear()
      document.location.reload()
      return
    }
    else return data
  } catch (error) {
    console.log( 'logout',error.response);
  }
};