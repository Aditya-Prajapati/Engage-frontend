import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SectionStyles.css";

export default function Section(props) {

    const [activeIndex, setActiveIndex] = useState(props.activeIndex);

    const handleChildClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="d-flex justify-content-around bd-highlight" id="Section">

            {props.sections.map((section, index) => {
                return (
                    <Link
                        to={ section==="Followers" ? `/profile/${props.user.username}/followers` : (section==="Following" ? `/profile/${props.user.username}/following` : "#") }
                        key={index}
                        className={`SectionLinks py-2 flex-md-fill bd-highlight ${activeIndex === index ? "active" : ""}`}
                        onClick={() => handleChildClick(index)}
                    >
                        {section}
                    </Link>
                )
            })}

        </div>
    );
}
