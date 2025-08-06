import React from "react";
import "../style/Card.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

const Card = ({userPost}) => {
    const creationDate = new Date(userPost.created_at);
    const now = new Date();
    const difference = now - creationDate;

    // format the post time
    const timeFormat = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
        }
    };

    // const commentCount = userPost.comments ? userPost.comments.length : 0;

    return (
        <>
            <div className="whole-page mb-5">
                <br />
                <br />
                <Link className="text-card-link" to={"/detail/" + userPost.id}>
                    <div className="post-card">
                        <div className="posted-ago-container">
                            <h4><span>Posted</span> {timeFormat(difference)}</h4>
                        </div>
                        <div className="post-title-container">
                            <h2>{userPost.title}</h2>
                        </div>
                        <div className="post-votes-container">
                            <h4>{userPost.vote} <span>Votes</span></h4>
                        </div>

                        {/* <h4><span>|</span></h4> */}
                        
                    </div>
                </Link>
                <br />
                <br />
            </div>
        </>
    )
}

export default Card;