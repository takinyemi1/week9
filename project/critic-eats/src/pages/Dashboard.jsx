import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import "../style/Dashboard.css";
import Card from "../components/Card";
import { useOutletContext } from "react-router-dom";

const Dashboard = ({userPostContent, searchContent = ""}) => {
    const [posts, setPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState("newest");
    const [searchInput, setSearchInput] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const fetchUserPosts = async () => {
        const {data, error} = await supabase
            .from("posts")
            .select();

        if (error) {
            console.log("Error fetching posts: ", error);
        } else {
            // filter posts through search
            let filteredData = data.filter((post) => post.title?.toLowerCase().includes(searchContent?.toLowerCase() || "")); // ? - don't crash if title is undefined

            // sort posts based on the newest edited/posted
            if (sortOrder === "newest") {
                filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (sortOrder === "mostPopular") {
                filteredData.sort((a, b) => b.vote - a.vote);
            }
            console.log(filteredData);
            setPosts(filteredData);
        }
    };

    useEffect(() => {
        searchPosts();
    }, [searchInput]);

    useEffect(() => {
        setSearchInput("");
        fetchUserPosts();
    }, [sortOrder, searchContent]);

    const searchPosts = () => {
        if (searchInput !== "") {
            const filteredResults = posts.filter((item) => 
                item.title?.toLowerCase().includes(searchInput?.toLowerCase())
            );

            setFilteredPosts(filteredResults);
        } else {
            if (posts && posts.length > 0) {
                setFilteredPosts(posts);
            }
        }
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };
    
    return (
        <>
            <div className="whole-page">
                <div className="order-container">
                    <h4>Order by:</h4>
                    <div className="buttons">
                        <button className="order-btn" style={{backgroundColor: "#deec5dff"}} onClick={() => handleSortOrderChange("newest")}>
                            Newest
                        </button>

                        <button className="order-btn" style={{backgroundColor: "#67a86aff"}} onClick={() => handleSortOrderChange("mostPopular")}>
                            Most Popular
                        </button>
                    </div>
                </div>
                {/* {filteredPosts && filteredPosts.length > 0 ?
                    <div className="post-user-container">
                        {filteredPosts.map((item) => (
                            <Card
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div> : 
                    <h2 style={{
                        color: "white",
                        margin: "auto"
                    }}>You have no posts currently!</h2>
                } */}

                <div className="post-user-container">
                    {posts.length === 0 ? (
                        <h2 style={{
                            color: "white",
                            margin: "auto"
                        }}>You have no posts currently!</h2>
                    ) : (
                        posts.map((userPost) => <Card key={userPost.id} userPost={userPost} />)
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard;