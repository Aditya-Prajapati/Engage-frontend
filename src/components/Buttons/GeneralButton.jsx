import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Buttons.css";
import axios from "axios";

const handleFollow = (userToMap, setButtonText, followUpdated, setFollowUpdated) => {
    
    axios
        .post("http://localhost:8000/follow",
        {
            userToMap: userToMap
        },
        { withCredentials: true }
        )
        .then((res) => {
            {setFollowUpdated && setFollowUpdated(!followUpdated)}
            if (res.data.message === "Follows Decremented"){
                setButtonText("Follow")
            } 
            else {
                setButtonText("Following")
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

export default function GeneralButton(props){
    /* (props.requestId == 0) -> followButton
    */

    return (
            <Link to={props.to} className="d-flex align-items-center justify-content-center general-button-container">

                <button
                    onClick={() => {props.requestId == 0 && handleFollow(props.userToMap, props.setButtonText, props.followUpdated, props.setFollowUpdated)}}
                    className={"general-button " + props.className}
                    type={props.type} 
                    style={{ backgroundColor: `${props.bgc}`, ...props.style }}
                >
                    <div className="anchor" style={{ color: `${props.color}` }}> 
                        {props.svg}
                        {props.text} 
                    </div> 
                </button>
                
            </Link>
    );
}