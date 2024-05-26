import React from "react";
import "./NameAndIdSkeletonLoader.css";

const NameAndIdSkeletonLoader = ({ widthName, widthId, heightName, heightId, animationDelayName, animationDelayId }) => {
  return (
    <div className="skeleton-name-id">
      <div className="skeleton-name skeleton-animation" style={{ width: widthName, height: heightName, animationDelay: animationDelayName }}></div>
      <div className="skeleton-id skeleton-animation" style={{ width: widthId, height: heightId, animationDelay: animationDelayId }}></div>
    </div>
  );
};

NameAndIdSkeletonLoader.defaultProps = {
  widthName: "45%",
  heightName: "15px",
  widthId: "35%",
  heightId: "10px",
  animationDelayName: "0ms",
  animationDelayId: "100ms",
};

export default NameAndIdSkeletonLoader;