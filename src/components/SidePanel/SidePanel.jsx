import React, { useEffect, useState } from "react";
import SidePanelItem from "./SidePanelItem";
import "./SidePanel.css";
import axios from "axios";

const getUsers = (request, path, setUsersToMap, setUpdatedUser) => {

    axios
        .get("http://localhost:8000/getusers", {
            withCredentials: true,
            params: { users: request }
        }
        )
        .then((res) => {
            setUpdatedUser(res.data.user);
            if (path === "following"){
                setUsersToMap(res.data.user.follows);
            }
            else if (path === "followers"){
                setUsersToMap(res.data.user.followedBy);
            }
            else {
                setUsersToMap((res.data.randomUsers.length === 0) ? [] : res.data.randomUsers);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

export default function SidePanel(props){
    /* (props.requestId == 0) -> followers
    (props.requestId == 1) -> following
    */

    const [usersToMap, setUsersToMap] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(null);

    let customItemStyle = {
        backgroundColor: "white",
        backgroundColorHover: "red",
        borderRadius: "0",
        cursor: "pointer",
    }

    useEffect(() => {
        if (props.path === "followers" || props.path === "following"){
            getUsers("current", props.path, setUsersToMap, setUpdatedUser);
        }
        else {
            getUsers("random", props.path, setUsersToMap, setUpdatedUser);
        }
    }, [props.path])

    if (!usersToMap){
        return <div> Loading... </div>;
    }

    return (  
        (usersToMap.length !== 0) && <div className={"d-inline-flex bgc-white side-panel box-shadow " + props.classNames} style={props.style}>

            <ul className="list-group" >
                {props.heading || <h5 className="ms-1 p-4 pb-2"> Who to follow </h5>}

                {usersToMap.map((userToMap, index) => {
                    return (
                        <SidePanelItem 
                            key={index} 
                            user={updatedUser || props.user} 
                            followUpdated={props.followUpdated} 
                            setFollowUpdated={props.setFollowUpdated} 
                            userToMap={userToMap} 
                            followPage={props.followPage}
                            style={(props.requestId===0 || props.requestId===1) ? customItemStyle : {}}
                        />
                    )
                })}
            </ul>
        </div>
    );
}