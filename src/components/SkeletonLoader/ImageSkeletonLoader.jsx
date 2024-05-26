import React from "react";
import "./ImageSkeletonLoader.css";

const ImageSkeletonLoader = ({ width, height, animationDelay }) => {
  return (
    <div
      className="skeleton-image skeleton-animation"
      style={{ width, height, animationDelay }}
    ></div>
  );
};

ImageSkeletonLoader.defaultProps = {
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  animationDelay: "0ms",
};

export default ImageSkeletonLoader;