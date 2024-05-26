import React, { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/App.css";
import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import TweetArea from "../components/Feed/TweetArea";
import Tweet from "../components/Feed/Tweet";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header";
import TweetSkeletonLoader from "../components/SkeletonLoader/TweetSkeletonLoader";
import DarkModeButton from "../components/DarkModeButton/DarkModeButton";
import { UserContext } from "../Context/UserContext";

export default function Home(props) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState(null);
  const { DarkMode, setDarkMode } = useContext(UserContext);

  useEffect(() => {
    const getTweets = () => {
      axios
        .get("http://localhost:8000/tweet/gettweets", {
          withCredentials: true,
          params: { all: true },
        })
        .then((res) => {
          if (res.status === 200) {
            setTweets(res.data.tweets.reverse());
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTweets();
  }, []);

  // if (isLoading) {
  //   return <div> Loading... </div>;
  // }

  return (
    <div
      className={`d-flex main-container ${
        DarkMode === true ? "darkMode  darkMode-noBorder" : ""
      }`}
      id="home"
    >
      <div className="d-inline-flex">
        {(isTablet || isDesktop) && <Sidebar user={props.user} />}
      </div>

      <div className="d-inline-flex flex-column feed">
        <Header heading="Home" subHeading="" />
        <TweetArea
          user={props.user}
          tweets={tweets}
          setTweets={setTweets}
          text="What's on your mind ?!"
          buttonText="Post"
        />

        {isLoading
          ? [...Array(6)].map((_, index) => <TweetSkeletonLoader key={index} />)
          : tweets.map((tweet, index) => {
              let user = {
                name: tweet.name,
                username: tweet.username,
                picture: tweet.picture,
                date: tweet.date,
                time: tweet.time,
              };
              let liked = tweet.likedBy.filter((likedBy) => {
                return likedBy === props.user.username;
              });
              return (
                <Tweet
                  key={index}
                  tweet={tweet}
                  user={user}
                  liked={liked.length}
                  currentUser={props.user}
                  disableDeleteTweet={props.user.username !== user.username}
                  removeOptions={true}
                />
              );
            })}

        {isMobile && <MobileNavbar user={props.user} />}
      </div>

      <div className={"d-inline-flex flex-column side-panel-container"}>
        {isDesktop && (
          <div className="sticky-top">
            <Searchbar user={props.user} style={{ width: "100%" }} />
            <SidePanel user={props.user} />
          </div>
        )}
      </div>
      <DarkModeButton />
    </div>
  );
}
