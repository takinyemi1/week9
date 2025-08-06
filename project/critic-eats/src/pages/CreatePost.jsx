import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import critic from "../assets/critic.png"
import "../style/CreatePost.css"

const CreatePost = () => {
    const [input, setInput] = useState({
        title: "",
        origin: "",
        service: "",
        rating: 0,
        image: "",
        description: "",
        vote: 0,
        comments: [],
    });

    const serviceType = ["Homecooked", "Restaurant", "Both"];

    const handleChange = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value,
        }));
    };

    const createPost = async (e) => {
        e.preventDefault();

        var inputService = input["service"] === "" ? "Both" : input["service"];
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");

        if (titleInput.value.trim() === "" || descriptionInput.value.trim() === "") {
            // let user know the title is missing
            alert("Title box or description box are empty. Please enter a title or description.");
        } else {
            // proceed to create post
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    {
                        title: input.title,
                        origin: input.origin,
                        service: inputService,
                        // rating: input.rating,
                        image: input.image,
                        description: input.description,
                    }
                ])
                .select();

            if (error) {
                console.log("Error creating post: ", error);
            } else {
                console.log("Post created: ", data);
                alert("Post published successfully!");
                window.location = "/dashboard" // redirect to dashboard
            }
        }
    }

    return (
        <>
            <div className="whole-page">
                <br />
                <h1 style={{ color: "#535239ff", fontSize: "50px" }}>Create Post</h1>
                <br />
                <img src={critic} alt="Critic Logo" style={{ width: "30%", height: "auto" }} />

                <br /><br />
                <div className="form-container">
                    <div className="input-container">
                        <label className="post-label" htmlFor="title">Name</label>
                        <input type="text" id="title" name="title" placeholder="Enter Food Name (Title)" onChange={handleChange} value={input.title} required />
                    </div>

                    <div className="input-container">
                        <label className="post-label" htmlFor="origin">Origin</label>
                        <input type="text" id="origin" name="origin" placeholder="Enter Origin (Optional)" onChange={handleChange} value={input.origin} />
                    </div>

                    <div className="input-container">
                        <label className="post-label" htmlFor="service">Service</label>
                        {serviceType &&
                            serviceType.map((services) => (
                                <li key={services} style={{ fontSize: "18px" }}>
                                    <input type="radio"
                                        className="services-radio"
                                        id={services}
                                        name="service"
                                        value={services}
                                        checked={input["service"] == services}
                                        onChange={handleChange}
                                    />
                                    {services}
                                </li>
                            ))
                        }
                    </div>

                    <div className="input-container">
                        <label className="post-label" htmlFor="rating">Rating (?/5)</label>

                        <div className="star-rating-container mb-5">

                        </div>

                        <input type="number" id="rating" name="rating" onChange={handleChange} placeholder="Enter Rating (optional)" value={input.rating} />
                    </div>

                    <div className="input-container">
                        <label className="post-label" htmlFor="image">Image URL</label>
                        <input type="text" id="image" name="image" onChange={handleChange} value={input.image} placeholder="Enter Image URL" />
                    </div>

                    <div className="input-container">
                        <label className="post-label" htmlFor="description">Description</label>
                        <textarea id="description" name="description" rows="5" cols="50" placeholder="Enter Critique or Description" onChange={handleChange} value={input.description} required />
                    </div>
                </div>
                <br /><br />
                <button className="create-post-btn" onClick={createPost}>Create Post</button>
                <br /><br />
            </div>
        </>
    )
}

export default CreatePost;