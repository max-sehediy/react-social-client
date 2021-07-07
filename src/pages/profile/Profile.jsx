import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/post/2.jpeg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src="/assets/person/6.jpeg"
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Maksym Sehediy</h4>
              <span className="profileInfoDesc">Web Developer</span>
            </div>
          </div>
          <div className="profileRightTop">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
