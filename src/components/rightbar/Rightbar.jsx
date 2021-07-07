import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFrindList">
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
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">Dallas</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Uzhhorod</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">married</span>
          </div>
        </div>
        <h4 className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/person/7.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowing Name">John Carter</span>
          </div>
        </h4>
        <h4 className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/person/7.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowing Name">John Carter</span>
          </div>
        </h4>
        <h4 className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/person/7.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowing Name">John Carter</span>
          </div>
        </h4>
        <h4 className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/person/7.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowing Name">John Carter</span>
          </div>
        </h4>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
