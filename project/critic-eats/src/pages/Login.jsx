import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../style/Login.css"
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const Login = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const {
                    data: {session},
                } = await supabase.auth.getSession();
                setSession(session?.user ?? null);

                supabase.auth.onAuthStateChange((_event, session) => {
                    setSession(session?.user ?? null);
                })

            } catch (e) {
                console.log("Error fetching session: ", e);
            }
        };

        fetchSession();
    }, []);

    // for redirection
    useEffect(() => {
        if (session) {
            navigate("/dashboard", {replace: true});
        }
    }, [session]);

    const loginNavigation = () => {
        navigate("/login");
    }

    const registerNavigation = () => {
        navigate("/register");
    }

    const handleLogin = async () => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            console.log("User signed in: ", data.user);
            setSession(data.session); // update the session to reflect the signed in user
            alert("You have successfully signed in!")
            navigate("/dashboard", {replace: true});

        } catch (e) {
            console.log("Error logging in: ", e);
            alert(`Error logging in: ${e.message}`);
        }
    }

    return (
        <>
            <div className="whole-page mb-5" style={{backgroundColor: "#d7dfb9"}}>
                <br /><br />
                {/* <p>User: {session ? session.user.email : "Not signed in"}</p> */}
                
                {!session && (
                    <>
                        <div className="login-content">
                            <div className="mb-5">
                            <div className="mb-5"></div>

                                <label htmlFor="email">Email</label>
                                <br /><br />
                                <input className="login-input mb-5" type="email" id="email" name="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                
                                <br />

                                <label htmlFor="password">Password</label>
                                <br /><br />
                                <input className="login-input mb-5" type="password" id="password" name="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />

                                <div className="forgot-password mb-3">
                                    <a href="!#">Forgot Password?</a>
                                </div>
                            </div>
                            
                            <div className="mb-5"></div>

                            <button className="sign-in-btn mb-5" onClick={handleLogin}>Sign In</button>
                            <p className="text-center">Not a Member? <Link to="/register" className="register-name">Register</Link></p>
                            <br /><br /><br /><br />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Login;