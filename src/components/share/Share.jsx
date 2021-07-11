import { Label, PermMedia, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext } from "react";
import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const name = user.username.charAt(0).toUpperCase() + user.username.slice(1);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name.slice(file.name.indexOf("."));
      data.append("file", file, fileName);
      newPost.img = fileName;
      console.log(data);
      try {
        await axios.post("upload", data);
      } catch (error) {
        console.log(`error`, error);
      }
    }
    try {
      await axios.post("/post", newPost);
    } catch (error) {
      console.log(`error`, error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={`What's in your mind, ${name}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept=".png,.jpeg,jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {/* <input type="file" id="file" accept="image/*" /> */}
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
