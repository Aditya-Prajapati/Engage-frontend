import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import "../components/App.css";
import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import Tweet from "../components/Feed/Tweet";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header";
import Comments from "../components/Feed/Comments";
import TweetArea from "../components/Feed/TweetArea";

export default function TweetPage(props) {

    const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });
    const [tweet, setTweet] = useState(null);
    const { username, tweetId, isComment } = useParams();
    const [newComment, setNewComment] = useState(false);
    const [commentClicked, setCommentClicked] = useState(null);

    useEffect(() => {
        setCommentClicked(null);
        setTweet(null);

        const fetchTweet = (tweetId) => {
            axios.get(`http://localhost:8000/tweet/gettweet/${tweetId}`,
                { withCredentials: true }
            )
                .then((res) => {
                    setTweet(res.data.tweet);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        const fetchComments = () => {
            axios.get(`http://localhost:8000/tweet/getcomments/${tweetId}`, // comment is treated as tweet
                { withCredentials: true }
            )
                .then((res) => {
                    setCommentClicked(res.data.comments.reverse());
                    fetchTweet(res.data.comments[1] ? res.data.comments[1].commentId : tweetId);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchComments();
    }, [tweetId, newComment])

    if (!tweet || !commentClicked) return <div> Loading... </div>;

    return (
        <div className="d-flex main-container" id="tweet-page">

            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar user={props.user} />}
            </div>

            <div className="d-inline-flex flex-column feed">
                <Header heading="Tweet" subHeading="" />

                <Tweet
                    tweet={tweet}
                    liked={tweet.likedBy.filter((likedBy) => {
                        return likedBy === props.user.username
                    })}
                    user={{ name: tweet.name, username: tweet.username, picture: tweet.picture }}
                    currentUser={props.user}
                    disableDeleteTweet={true}
                    directComment={true}
                    tweetPage={true}
                    setNewComment={setNewComment}
                    threaded={true}
                />
                {commentClicked
                    .filter((comment) => comment !== null)
                    .map((comment, index) => {
                        let user = {
                            username: comment.username,
                            name: comment.name,
                            picture: comment.picture
                        };
                        let liked = comment.likedBy.filter((likedBy) => {
                            return likedBy === props.user.username
                        })
                        return (
                            <Tweet
                                key={index}
                                tweet={comment}
                                liked={liked}
                                user={user}
                                currentUser={props.user}
                                setNewComment={setNewComment}
                                threaded={true}
                                isComment={true}
                                disableDeleteTweet={true}
                            />
                        );
                    })
                }
                <TweetArea
                    tweet={commentClicked.at(-1) ? commentClicked.at(-1) : tweet}
                    user={props.user}
                    text="Tweet your reply!"
                    buttonText="Reply"
                    style={{ marginTop: "10px" }}
                    makeReply={true}
                    setNewComment={setNewComment}
                    comments={commentClicked.at(-1) ? commentClicked.at(-1).comments : tweet.comments}
                    isComment={commentClicked.at(-1) ? true : false}
                />
                <Header heading="Comments" subHeading="" />
                <Comments
                    user={props.user}
                    tweet={commentClicked.at(-1) ? commentClicked.at(-1) : tweet}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    commentClicked={commentClicked}
                    setCommentClicked={setCommentClicked}
                />

                {isMobile && <MobileNavbar user={props.user} />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <Searchbar style={{ width: "100%" }} />
                    <SidePanel user={props.user} />
                </div>}

            </div>

        </div>
    );
}
