import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const handlePopUp = () => {
    toast.info("Functionality currently unavailable")
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Link Up</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span><HomeOutlinedIcon /></span>
        </Link>
        
        {darkMode ? (
          <WbSunnyOutlinedIcon style={{cursor: "pointer"}} onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon style={{cursor: "pointer"}} onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." style={{cursor: "pointer"}} onClick={handlePopUp}/>
        </div>
      </div>
      <div className="right">
        <NotificationsOutlinedIcon style={{cursor: "pointer"}} onClick={handlePopUp}/>
        <Link
          to={`/profile/${currentUser.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="user">
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.name}</span>
          </div>  
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
