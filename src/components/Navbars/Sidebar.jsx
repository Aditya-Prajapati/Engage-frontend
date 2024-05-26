import React from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { faHouse, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import TwitterIcon from "@mui/icons-material/Twitter";
import ProfileImage from "../ProfileImage";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sidebar(props) {
  const navigate = useNavigate();

  function handleLogout() {
    axios
      .post("http://localhost:8000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="d-inline-flex flex-column align-items-end p-2 sidebar">
      {/* Main Logo */}
      <a href="/home" className="p-3">
        <TwitterIcon fontSize="large" sx={{ color: "#1da1f2" }} />
      </a>

      {/* Icons */}
      <ul className="nav flex-column mb-auto text-center">
        <div className="d-flex align-items-center justify-content-center sidebar-nav-item">
          <NavItem
            link="/home"
            iconName={faHouse}
            iconColor={"#282829"}
            iconSize={"xl"}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center sidebar-nav-item">
          <NavItem
            link="/explore"
            iconName={faHashtag}
            iconColor={"#282829"}
            iconSize={"xl"}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center sidebar-nav-item">
          <NavItem
            link="/profile"
            iconName={faUser}
            iconColor={"#282829"}
            iconSize={"xl"}
          />
        </div>
      </ul>

      {/* Profile Icon */}
      <div className="dropdown border-top">
        <div
          className="d-flex align-items-center justify-content-center p-3 link-body-emphasis dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <ProfileImage width={46} height={46} user={props.user} />
        </div>

        <ul className="dropdown-menu text-small shadow">
          <li>
            <a className="dropdown-item" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
