import React, { useState } from "react";
import axios from "axios";
import ProfileImage from "../ProfileImage";
import CollectionsIcon from '@mui/icons-material/Collections';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import GeneralButton from "../Buttons/GeneralButton";
import "./TweetArea.css";

export default function TweetArea(props){

    const [tweetContent, setTweetContent] = useState("");
    
    const postTweet = async (e) => {
        e.preventDefault();

        await axios
            .post("http://localhost:8000/tweet/posttweets",
            {
                name: props.user.name,
                username: props.user.username,
                tweetContent: tweetContent.trim()
            }, 
            { withCredentials: true }
            )
            .then((res) => {
                if (res.status === 200){
                    setTweetContent("");
                }
                props.setTweets([res.data.postedTweet, ...props.tweets]); 
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const comment = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/tweet/comment",
            {
                comments: props.comments,
                isComment: props.isComment || false,
                tweetId: props.tweet._id, // comments are treated as tweet, so this tweet could be a comment too
                tweetContent: tweetContent.trim() // comment content
            },
            { withCredentials: true }
            )
            .then((res) => {
                setTweetContent("");
                {props.setComments && props.setComments(res.data.updatedComments);}
                {props.setNewComment && props.setNewComment(true);}
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={"d-flex tweet-area"} style={props.style}>

            <ProfileImage style={{ margin: "4px 14px 0 0" }} width={props.width} height={props.height} user={props.user} />

            <div className="d-flex flex-column" style={{ width: "100%" }}>
                <form onSubmit={props.makeReply ? comment : postTweet}>
                    
                    <textarea placeholder={props.text} onChange={(e) => {setTweetContent(e.target.value)}} value={tweetContent} className={"tweet-area-text-area"}></textarea>

                    <div className={"d-flex my-2 align-items-center justify-content-between"}>

                        <div className={"d-flex"}>
                            <div href="#"> <CollectionsIcon className={"ms-1"} fontSize="small" sx={{ color: "#1da1f2" }} /> </div>
                            <div href="#"> <GifBoxIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </div>
                            <div href="#"> <SentimentSatisfiedAltIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </div>
                        </div>

                        <button 
                            className={"tweet-button"}
                            disabled={ !( /\S/.test(tweetContent) ) } 
                            style={{ backgroundColor: `${ !(/\S/.test(tweetContent)) ? "rgb(29, 161, 242, 0.5)" : "rgb(29, 161, 242)" }` }}
                        > 
                            {props.buttonText}
                        </button>
                        
                    </div>

                </form>
            </div>
        </div>
);
}