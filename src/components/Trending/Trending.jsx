import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./TrendingStyles.css";

export default function Trending() {
  return (
    <div id="Trending" className="py-2 px-2">
      
      <p className="Heading">1.Tiger</p>
      <div className="Hastag-div">
        <p className="Hastag">#Trending</p>
        <button className="Setting">...</button>
      </div>
      <p className="Tweets">7500 Tweets</p>
      
    </div>
  );
}
