import React from "react";

export default function NameAndId(props){

    if (!props.user) {
        return <div> Loading... </div>; 
    }

    let userCopy = JSON.parse(JSON.stringify(props.user));

    if (!props.profileBox && userCopy.username.length > 18) {
        userCopy.username = (userCopy.username.substring(0, 18) + "...");
    }

    return (
        <div className="d-inline-flex flex-column name-and-id">

            <p className="m-0" style={{ fontWeight: "500" }}> {userCopy.name} </p> 
            <div style={{ color: "rgb(83, 100, 113)" }}><span> {userCopy.username} </span></div>
            
        </div>
    );
}