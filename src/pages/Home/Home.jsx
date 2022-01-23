import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Feed page="Home" />
      </div>
    </>
  );
};

export default Home;
