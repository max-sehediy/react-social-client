import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {
  useEffect,
} from "react";
import { useParams } from "react-router";
import { getConversations } from "../../store-redux/conversation/conversationStore";
import { useDispatch, useSelector } from "react-redux";
import { viewUserFetch } from "../../store-redux/viewUser/viewUserStore";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUser = useSelector((state) => state.user.currentUser);
  const user = useSelector((state) => state.viewUser.viewUser);
  const dispatch = useDispatch();
  const username = useParams().username;

  useEffect(() => {
    dispatch(viewUserFetch(username));
  }, [username]);
  useEffect(() => {
    const getConver = () => {
      dispatch(getConversations(currentUser._id));
    };
    getConver();
  }, [currentUser]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
