import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user, updatePost } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      console.log(`username`, username);
      const { data } = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/" + user._id);
      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id, updatePost]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
