import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home() {
  // useEffect(() => {
  // console.log(localStorage.getItem("user"));
  // loginCall(
  //   { email: email.current.value, password: password.current.value },
  //   dispatch
  // );
  // localStorage.setItem("user", JSON.stringify(state.user));
  // }, []);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
