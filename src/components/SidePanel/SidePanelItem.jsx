import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import GeneralButton from "../Buttons/GeneralButton";
import NameAndId from "../ProfileBox/NameAndId";
import ProfileImage from "../ProfileImage";
import "./SidePanel.css";
import axios from "axios";

export default function SidePanelItem(props) {

    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });
    const [buttonText, setButtonText] = useState("");
    const [buttonHover, setButtonHover] = useState(false);
    
    useEffect(() => {
        const temp = props.user.follows.filter((follows) => {
            return follows.username === props.userToMap.username;
        });
        
        setButtonText(temp.length ? "Following" : "Follow");
    }, [props.user.follows, props.userToMap.username]);

    const handleButtonEnter = () => {
        if (buttonText==="Following"){
            setButtonHover(true);
            setButtonText("Unfollow");
        }
    }
    
    const handleButtonLeave = () => {
        if (buttonText==="Unfollow"){
            setButtonText("Following");
        }
        setButtonHover(false);
    }

    return (
        <li className="d-flex list-group-item my-1 bgc-white side-panel-item " style={props.style}>

            {/* Image */}
            <div className="me-1 pe-2">
                <div href="#" className="anchor d-inline-flex align-items-center justify-content-center">
                    <ProfileImage width={46} height={46} user={props.userToMap} />
                </div>
            </div>

            {/* Content */}
            <div className="d-flex align-items-center justify-content-between side-panel-item-content">
                <NameAndId user={props.userToMap} />
                <div onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave}>
                    <GeneralButton
                        requestId={0}
                        user={props.user}
                        followUpdated={props.followUpdated}
                        setFollowUpdated={props.setFollowUpdated}
                        userToMap={props.userToMap}
                        bgc={buttonText==="Follow" ? "#282829" : "white"}
                        color={buttonText==="Follow" ? "white" : ((buttonText!=="Following" && buttonHover) ? "red" : "#282829")}
                        text={buttonText}
                        setButtonText={setButtonText}
                        style={{ borderColor: buttonText==="Unfollow" ? "red" : "black"}}
                    />
                </div>
            </div>

        </li>
    );
}
