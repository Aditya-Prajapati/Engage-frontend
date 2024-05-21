import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tweet.css";
import ProfileImage from "../ProfileImage";
import NameAndId from "../ProfileBox/NameAndId";
import TweetArea from "./TweetArea";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from "axios";
import Tweet from "./Tweet";

export default function Comments(props) {

    const [likes, setLikes] = useState(props.tweet.likes);
    const [comments, setComments] = useState(0);
    const [clickedComments, setClickedComments] = useState(false);
    const [commentedBy, setCommentedBy] = useState(null);

    useEffect(() => {
        const getComments = () => {
            axios
                .post("http://localhost:8000/tweet/getcomments",
                    {
                        tweetId: props.tweet._id // might be the commentId, bcz comment is treated as tweet
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    setCommentedBy(res.data.comments.reverse());
                    props.setNewComment(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getComments();
    }, [props.newComment])

    if (commentedBy == null) return <div> Loading... </div>;

    return (
        <>
            {/* Tweet component is used for comments too */}
            {commentedBy.map((commentBy, index) => {
                let user = {
                    name: commentBy.name,
                    username: commentBy.username,
                    picture: commentBy.picture
                }
                let liked = commentBy.likedBy.filter((likedBy) => {
                    return likedBy === props.user.username
                })
                return (
                    <Tweet
                        key={index}
                        tweet={commentBy}
                        liked={liked.length}
                        user={user}
                        currentUser={props.user}
                        isComment={true}
                        style={{ cursor: "pointer" }}
                        disableDeleteTweet={true}
                    />
                )
            })}
        </>
    )
}