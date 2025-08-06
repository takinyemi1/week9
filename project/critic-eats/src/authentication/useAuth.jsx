import React, { createContext, useContext, useEffect } from "react";
import { supabase } from "../client";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // function to fetch the initial session
        const fetchUser = async () => {
            try {
                const { data: { session }, } = await supabase.auth.getSession();
                console.log("Session: ", session.user.user_metadata);
                setUser(session?.user ?? null);
            } catch (e) {
                console.log("Error fetching session: ", e);
            }
        };

        // fetch initial session
        fetchUser();

        // listener for auth state changes
        const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // clean up listener on component unmount
        return () => {
            authListener?.subscription.unsubscribe();
        };

    }, []);

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);