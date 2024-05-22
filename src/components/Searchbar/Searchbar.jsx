import react, { useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";
import SidePanel from "../SidePanel/SidePanel";
import SidePanelItem from "../SidePanel/SidePanelItem";

export default function Searchbar(props) {
  const [input, setInput] = useState("");
  const [usersToMap, setUsersToMap] = useState(null);

  const fetchUsers = (value) => {
    axios
      .get("http://localhost:8000/user/getusers", {
        withCredentials: true,
        params: { users: "search", toSearch: value },
      })
      .then((res) => {
        console.log(res.data.users);
        setUsersToMap(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchUsers(value);
  };

  return (
    <>
      <div
        className={
          "d-inline-flex align-items-center mt-2 searchbar " + props.className
        }
        style={props.style}
      >
        <SearchIcon
          className="align-items-center ms-2 me-3 "
          fontSize="medium"
          sx={{ color: "rgb(83, 100, 113)" }}
        />
        <input
          className="d-flex w-100 bgc-white"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search users"
        />
      </div>
      <div className="search-box-container d-flex justify-content-center">
        <div className="search-box bgc-white box-shadow">
          {usersToMap !== null && usersToMap.length ? (
            <div className="search-box-heading">Search for "{input}"</div>
          ) : (
            ""
          )}
          <ul className="list-group">
            {usersToMap &&
              usersToMap.map((userToMap, index) => {
                return (
                  <SidePanelItem
                    key={index}
                    user={props.user}
                    followUpdated={props.followUpdated}
                    setFollowUpdated={props.setFollowUpdated}
                    userToMap={userToMap}
                    followPage={props.followPage}
                    style={{ backgroundColor: "white" }}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

// : (
//   <div className="search-box-heading">Try searching for people...</div>
// )}
