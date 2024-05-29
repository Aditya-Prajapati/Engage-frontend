import React from "react";
import "./ButtonSkeletonLoader.css";

const ButtonSkeletonLoader = ({ height, width, borderRadius }) => {
  return (
    <div
      className="skeleton-button skeleton-animation"
      style={{ height, width, borderRadius }}
    ></div>
  );
};

ButtonSkeletonLoader.defaultProps = {
  borderRadius: "40px",
  height: "30px",
  width: "66px",
};

export default ButtonSkeletonLoader;
