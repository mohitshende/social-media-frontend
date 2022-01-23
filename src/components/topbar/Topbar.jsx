import "./Topbar.css";
import { ArrowDropDown, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import Avatar from "../../images/noAvatar.png";
import axios from "../../axios";

const Topbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const { user } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userList = await axios.get(`/users?username=${searchText}`);
        setSearchResult(userList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [searchText]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.go("/login");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="title">Insta</h1>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend"
            className="searchInput"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        {searchResult && (
          <div className="searchResults">
            <Link
              to={`/profile/${searchResult.username}`}
              style={{ textDecoration: "none" }}
              key={searchResult._id}
            >
              <div className="user">
                <img className="user_img" src={Avatar} alt="user" />
                <h3>{searchResult.username}</h3>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="topbarRight">
        <div className="topbarRightEnd">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture || Avatar}
              alt=""
              className="topbarImg"
            />
          </Link>
          <h4 className="topbarUsername">{user.username}</h4>
          <ArrowDropDown
            className="topbarRightEndIcon"
            onClick={() => setShowDropdown(!showDropdown)}
          />
        </div>
        <span
          className="dropdown"
          style={{ display: showDropdown ? "inline-block" : "none" }}
          onClick={handleLogout}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Topbar;
