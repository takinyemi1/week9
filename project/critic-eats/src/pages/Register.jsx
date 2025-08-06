import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/Register.css"
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { supabase } from "../client";

const Register = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginNavigation = () => {
        navigate(`/login`, {replace: true});
    }

    const registerNavigation = () => {
        navigate(`/register`, {replace: true});
    }

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

    const handleRegister = async () => {
        try {
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name, // stores name in user_metadata
                    },
                },
            });

            if (error) {
                throw error;
            }

            console.log("User signed up: ", data.user);
            alert("You have successfully registered for CriticEats!");

        } catch (e) {
            console.log("Error registering user: ", e);
            alert(e.message);
        }
    };

    return (
        <>
            <div className="whole-page">
                <br /><br />
                {/* <p>User: {session ? session.user.email : "Not signed in"}</p> */}
                
                {!session && (
                    <>
                        <div className="register-content">
                            <label htmlFor="name">Name</label>
                            <br /><br />
                            <input className="register-input mb-5" type="name" id="name" name="name" placeholder="Enter Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                            
                            <br />

                            <label htmlFor="email">Email</label>
                            <br /><br />
                            <input className="register-input mb-5" type="email" id="email" name="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            
                            <br />

                            <label htmlFor="password">Password</label>
                            <br /><br />
                            <input className="register-input mb-5" type="password" id="password" name="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />

                            <br />

                            <button className="sign-in-btn mb-5" onClick={handleRegister}>Register</button>
                            <p className="text-center">Already have an account? Sign in <Link to="/login" className="register-name">here</Link></p>
                            <br />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Register;