import { Link } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({ user, fake }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`} className="link">
        <img
          className="sidebarFriendImg"
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <span className="sidebarFriendName">
          {user.username}
          {fake ? " FAKE" : null}
        </span>
      </Link>
    </li>
  );
}
