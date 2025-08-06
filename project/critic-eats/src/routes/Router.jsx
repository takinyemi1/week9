import React from "react";
import "./Router.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from "../assets/logo.jpg"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";

const Router = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const {
                    data: {session},
                } = await supabase.auth.getSession();
                setSession(session);

            } catch (e) {
                console.log("Error fetching session: ", e);
            }
        };

        fetchSession();
    }, []);

    const handleLogout = async () => {
        try {
            const {error} = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            console.log("User successfully signned out");
            setSession(null);
            alert("You have successfully signed out!");

        } catch (e) {
            console.log("Error logging out: ", e.message);
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <a href="/" className="logo">
                        {/* <img src={logo} alt="Logo" className="logo-img" /> */}
                        CriticEats
                    </a>
                </div>

                <div className="navbar-center">
                    {/* <a href="/search" className="search-post"> */}
                        {/* <i className="bi bi-search"></i> */}
                        <input className="search-bar" type="text" placeholder="Search by Post Name" />
                    {/* </a> */}
                </div>

                <div className="navbar-right">
                    <ul className="nav-links">
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/create-post">Create a Post</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout} className="logout-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Router;