import "./RightSidebar.css";
import { useEffect, useState, useContext } from "react";
import Avatar from "../../images/noAvatar.png";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const RightSidebar = ({ user, username }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rightsidebar">
      <div className="rightsidebarWrapper">
        <>
          {username !== currentUser.username && (
            <button className="rightsidebarFollowButton" onClick={handleFollow}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
          )}

          <h4 className="rightsidebarTitle">User Friends</h4>
          {friends.length !== 0 ? (
            <div className="rightsidebarFollowings">
              {friends.map((friend) => (
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                  key={friend._id}
                >
                  <div className="rightsidebarFollowing">
                    <img
                      src={friend.profilePicture || Avatar}
                      alt="friend"
                      className="rightsidebarFollowingImg"
                    />
                    <span className="rightsidebarFollowingName">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <h3>No friends, Follow Someone</h3>
          )}
        </>
      </div>
    </div>
  );
};

export default RightSidebar;
