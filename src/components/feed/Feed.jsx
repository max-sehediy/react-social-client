import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/60e1931b54f6ded7caa086d6");
      setPosts(data);
    };
    fetchPosts();
  }, []);

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
