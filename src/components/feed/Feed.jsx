import {
  useEffect,
  useState,
} from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector } from "react-redux";
import { $host } from "../../http";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await $host.get("/posts/profile/" + username)
          : await $host.get("posts/timeline/" + user._id);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
