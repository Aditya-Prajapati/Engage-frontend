import react, { useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";
import SidePanel from "../SidePanel/SidePanel";
import SidePanelItem from "../SidePanel/SidePanelItem";
import ClearButton from "./ClearButton";
import { getUsers } from "../../Utils/utils";

export default function Searchbar(props) {
  const [input, setInput] = useState("");
  const [usersToMap, setUsersToMap] = useState(null);
  const [followUpdated, setFollowUpdated] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  const handleChange = (value) => {
    setInput(value);
    getUsers("search", "search", setUsersToMap, setUpdatedUser, value);
  };

  const handleClear = () => {
    setInput("");
    setUsersToMap(null);
  };

  return (
    <div className="searchbar-container">
      <div
        className={
          "d-inline-flex align-items-center mt-2 searchbar " + props.className
        }
        style={props.style}
      >
        <SearchIcon
          className="searchIcon align-items-center ms-2 me-3 "
          fontSize="medium"
          sx={{ color: "rgb(83, 100, 113)" }}
        />
        <input
          className="d-flex bgc-white"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search users"
        />
        {input && <ClearButton onClick={handleClear} />}
      </div>
      <div className="search-box-container d-none justify-content-center">
        <div className="search-box bgc-white box-shadow">
          {usersToMap !== null && usersToMap.length ? (
            <div className="search-box-heading">Search for "{input}"</div>
          ) : (
            <>
              <div className="search-box-heading">
                Try searching for people...
              </div>
              <ul className="list-group">
                <li></li><li></li>
              </ul>
            </>
          )}
          <ul className="list-group">
            {usersToMap &&
              usersToMap.map((userToMap, index) => {
                return (
                  <SidePanelItem
                    key={index}
                    user={updatedUser || props.user}
                    followUpdated={followUpdated}
                    setFollowUpdated={setFollowUpdated}
                    userToMap={userToMap}
                    followPage={false}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
