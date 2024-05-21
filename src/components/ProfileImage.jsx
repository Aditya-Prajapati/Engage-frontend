import React from "react";

export default function ProfileImage(props){

    if (!props.user)
        return <div> Loading... </div>;

    const imageStyle = {
        width: !props.width ? "46px" : `${props.width}px`,
        height: !props.height ? "46px" : `${props.height}px`,
        ...props.style
    };

    return (
        <img
            className={"rounded-circle"}
            src={props.user.picture ? props.user.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_lSNw7Ee7u6J7SWu5Ku6BP6H3kMcOI9TFw&usqp=CAU"}
            alt="img"
            style={imageStyle}
        />
    );
}