import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css";

export default function LoginButton(props) {
    const navigate = useNavigate();

    function handleGoogleLogin() {
        window.open(props.link, "_self");
    }

    const styling = {
        ...props.style,
    };

    return (
        <a className="submit" onClick={handleGoogleLogin} style={{ textDecoration: "none" }}>
            <button
                className="d-flex bd-highlight rounded-pill LoginButton"
                type={props.type}
                style={styling}
            >
                {props.icon}
                <span className="ms-2" style={{ fontWeight: "500" }}> {props.text} </span>
            </button>
        </a>
    );
}
