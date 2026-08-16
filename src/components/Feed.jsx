import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;

  if(feed.length <=0) {
    return (
      <div className="min-h-[calc(100vh-4rem)]">
       <h2 className="text-center text-2xl font-bold m-auto">No more Users!</h2>
      </div>
    );
  }
  return feed &&(
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="flex justify-center">
        <UserCard user = {feed[0]}/>
      </div>
    </div>
  );
};

export default Feed;
