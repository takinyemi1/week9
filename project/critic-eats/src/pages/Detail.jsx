import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/Detail.css";

const Detail = () => {
    const {id} = useParams();
    const [userPost, setUserPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // fetch the post ID
        const fetchUserPost = async () => {
            const {data, error} = await supabase
                .from("posts")
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.log("Error fetching post: ", error);
            } else {
                setUserPost(data);
                console.log(data);

                setComments(data.comments || []);
            }
        }
        fetchUserPost();
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    }

    const handleAddComment = async () => {
        // add comment to the comments array
        const comment = document.getElementById("addedComment");

        if (comment.value.trim() === "") {
            // title is missing
            alert("You can't post a blank comment. Please add some context.");
        } else {
            const updatedComment = [...comments, {text: newComment, timeStamp: new Date()}];

            // update comments in supabase
            const {data, error} = await supabase
                .from("posts")
                .update({
                    comments: updatedComment
                })
                .eq('id', id);

            if (error) {
                console.log("Error adding comment: ", error);
            } else {
                setComments(updatedComment);
                setNewComment("");
            }
        }
    };

    const handleVote = async () => {
        // new vote count
        const updatedVotes = userPost.vote + 1;
        setUserPost({ ...userPost, vote: updatedVotes});

        // update the column
        const {data, error} = await supabase
            .from("posts")
            .update({
                vote: updatedVotes
            })
            .eq('id', id);

        if (error) {
            console.log("Error updating votes: ", error);
        } else {
            console.log(data);
        }
    };

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

    return (
        <>
            <div className="main-page">
                <br />
                <div className="whole-page">
                    {userPost ? (
                        <div className="post-card-container">
                            <div className="posted-ago-container">
                                <h4><span>Posted </span> {timeFormat(new Date() - new Date(userPost.created_at))}</h4>
                            </div>

                            <div className="post-title-detail-container">
                                <h2>{userPost.title}</h2>
                            </div>

                            <div className="img-actions-container">
                                <div className="post-img-container">
                                    <img className="post-img" src={userPost.image} alt={userPost.title} />
                                </div>

                                <br />
                                <div className="post-votes-container">
                                    <div className="votes-container">
                                        <button className="thumbs-up-btn" onClick={handleVote}>
                                            <i className="bi bi-hand-thumbs-up-fill"></i>
                                        </button>
                                        <h4 className="vote-amount">
                                            {userPost.vote} <span>votes</span>
                                        </h4>
                                    </div>
                                    <br />

                                    <div className="actions-container">
                                        <Link to={"/edit-post/" + userPost.id}>
                                            <button className="edit-post-btn"><i className="bi bi-pencil"></i></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="post-content-container">
                                <h2 className="description-label-container"><label>Description/Critique</label></h2>
                                <textarea className="content-textarea" readOnly value={userPost.description}></textarea>
                            </div>

                            <h2 className="comments-title-container">Comments</h2>
                            <div className="comments-container">
                                <ul>
                                    {comments.map((comment, index) => (
                                        <li className="actual-comments" key={index}>{comment.text}</li>
                                    ))}
                                </ul>
                                <div className="submit-comment-container">
                                    <textarea
                                        className="comment-textarea"
                                        id="addedComment"
                                        value={newComment}
                                        placeholder="Leave a comment..."
                                        onChange={handleCommentChange}
                                    >
                                    </textarea>

                                    <button onClick={handleAddComment}><i className="bi bi-sticky-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="loading-sign"><i className="bi bi-arrow-clockwise"></i></p>
                    )}
                    <br />
                </div>
            </div>
        </>
    )
}

export default Detail;