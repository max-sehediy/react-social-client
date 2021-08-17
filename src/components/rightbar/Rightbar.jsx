import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import EditUserData from "../../utils/modal/editUser/EditUserData";
import EditIcon from "@material-ui/icons/Edit";
import { axiosJWT } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW, isFRIEND, UNFOLLOW } from "../../store-redux/user/user";
import { getConversations } from "../../store-redux/conversation/conversationStore";

export default function Rightbar({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const friend = useSelector((state) => state.user.friend);
  const conversation = useSelector((state) => state.conversation);
  const [sameUser, setSameUser] = useState(currentUser?._id === user?._id);
  const [userDataVisible, setUserDataVisible] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosJWT.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    dispatch(isFRIEND(user?._id));
  }, [user, currentUser]);

  const goToConversation = async () => {
    let createConversation =
      conversation.conversations?.some((c) => c === user._id) || false;
    createConversation && history.push("/messenger");
    if (!createConversation) {
      try {
        const { data } = await axios.post("/conversations/", {
          senderId: currentUser._id,
          receiverId: user._id,
        });
        if (data) {
          dispatch(getConversations(currentUser._id));
          history.push("/messenger");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleClick = async () => {
    try {
      if (friend) {
        dispatch(UNFOLLOW(user._id));
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(FOLLOW(user._id));
      }
    } catch (err) {
      console.log("follow/unFollow", err.response);
    }
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user?.username !== currentUser?.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {friend ? "Unfollow" : "Follow"}
            {friend ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{currentUser?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{currentUser?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {currentUser?.relationship === 1
                ? "Single"
                : currentUser?.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        {sameUser ? (
          <button
            type="button"
            className="rightbarFollowButton edit"
            onClick={() => setUserDataVisible(true)}
          >
            Edit <EditIcon />
          </button>
        ) : (
          <button className="rightbarFollowButton" onClick={goToConversation}>
            Send a message
          </button>
        )}
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends
            ? friends.map((friend) => (
                <Link
                  key={friend._id}
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              ))
            : "Loading"}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
      <EditUserData
        onHide={() => setUserDataVisible(false)}
        show={userDataVisible}
      />
    </div>
  );
}
