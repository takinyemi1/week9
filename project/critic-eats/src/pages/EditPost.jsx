import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "../style/EditPost.css";

const EditPost = () => {
    const { id } = useParams();
    const [userPost, setUserPost] = useState(null);
    const serviceType = ["Homecooked", "Restaurant", "Both"]

    const [formContent, setFormContent] = useState({
        title: "",
        origin: "",
        service: "",
        rating: 0,
        image: "",
        description: "",
        vote: 0,
        comments: [],
    });

    useEffect(() => {
        // fetch the specific post based on the ID
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select()
                .eq('id', id)
                .single(); // gets 1 record

            if (error) {
                console.log("Error fetching post: ", error);
            } else {
                setUserPost(data);
                console.log("User data: ", data);
                setFormContent({
                    title: data.title,
                    origin: data.origin,
                    service: data.service,
                    // rating: 1,
                    image: data.image,
                    description: data.description,
                });
            }
        }
        fetchPost();
    }, [id]);

    const handleChange = async (e) => {
        setFormContent((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");

        if (titleInput.value.trim() === "" || descriptionInput.value.trim() === "") {
            alert("Title box or description box are empty. Please enter a title or description.");
        } else {
            const { data, error } = await supabase
                // update post
                .from("posts")
                .update({
                    title: formContent.title,
                    origin: formContent.origin,
                    service: formContent.service,
                    rating: formContent.rating,
                    image: formContent.image,
                    description: formContent.description,
                })
                .eq('id', id);
            if (error) {
                console.log("Error updating post: ", error);
            } else {
                // display confirmation
                alert("Post has been successfully updated!");
                // reload page
                window.location.href = `/`;
            }
        }
        return;
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        // delete post
        const {data, error} = await supabase
            .from("posts")
            .delete()
            .eq('id', id);

        if (error) {
            console.log("Error deleting post: ", error);
        } else {
            alert("Post has been successfully deleted!");
            console.log(data);

            window.location.href = "/";
        }
        return;
    };

    return (
        <>
            <div className="main-page">
                <div className="whole-page">
                    <br />
                    <div className="edit-post-form">
                        <img className="edit-post-img" src={formContent.image} />
                        <div className="edit-post-container">
                            <div className="edit-input-container">
                                <label className="post-label" htmlFor="title">Name</label>
                                <input 
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formContent.title}
                                    placeholder={formContent.title ? "Enter Food Name (Title)" : ""}
                                    onChange={handleChange}
                                    className="title-input-field"
                                    required
                                />
                            </div>

                            <div className="edit-input-container">
                                <label className="post-label" htmlFor="origin">Origin</label>
                                <input type="text" id="origin" name="origin" placeholder={formContent.origin ? "Enter Origin (optional)" : ""} onChange={handleChange} value={formContent.origin} />
                            </div>

                            <div className="edit-input-container">
                                <label className="post-label" htmlFor="service">Service</label>
                                {serviceType &&
                                    serviceType.map((services) => (
                                        <li key={services} style={{ fontSize: "18px" }}>
                                            <input type="radio"
                                                className="services-radio"
                                                id={services}
                                                name="service"
                                                value={services}
                                                checked={formContent.service == services}
                                                onChange={handleChange}
                                            />
                                            {services}
                                        </li>
                                    ))
                                }
                            </div>

                            <div className="edit-input-container">
                                <label className="post-label" htmlFor="image">Image URL</label>
                                <input type="text" id="image" name="image" onChange={handleChange} value={formContent.image} placeholder={formContent.image ? "Enter Image URL" : ""} />
                            </div>

                            <div className="edit-input-container">
                                <label className="post-label" htmlFor="rating">Rating (?/5)</label>
                                <input type="number" id="rating" name="rating" onChange={handleChange} placeholder={formContent.rating ? "Enter Rating (optional)" : ""} value={formContent.rating} />
                            </div>

                            <div className="edit-input-container">
                                <label className="post-label" htmlFor="description">Description</label><br />
                                <textarea id="description" name="description" rows="5" cols="50" placeholder={formContent.description ? "Enter Critique or Description" : ""} onChange={handleChange} value={formContent.description} required />
                            </div>

                            <div className="edit-action-btns">
                                <button className="edit-post-submit-btn" type="submit" onClick={handleSubmit} value="Submit">
                                    Update Post
                                </button>

                                <button className="edit-post-delete-btn" type="submit" onClick={handleDelete} value="Delete">
                                    Delete Post
                                </button>
                            </div>
                        </div>
                        <br />
                    </div>
                    <br /><br />
                </div>
            </div>
        </>
    )
}

export default EditPost;