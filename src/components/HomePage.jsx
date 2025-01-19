import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar.jsx";
import ChatList from "./ChatList.jsx";
import { DataContext } from "../DataContext.jsx";
import NavBarSkeleton from "./skeleton/NavBarSkeleton.jsx";
import ChatShowSkeleton from "./skeleton/ChatShowSkeleton.jsx";
const HomePage = ({ setTheme, theme }) => {
    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === "dark" ? "light" : "dark";
            window.localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    const { data } = useContext(DataContext);
    const user = window.localStorage.getItem("user");
    const [userProfile, setUserProfile] = useState({});
    const [list, setList] = useState([]);

    useEffect(() => {
        if (data && user && data[user]) {
            setUserProfile(data[user]);
            setList(JSON.parse(data[user].friend_list || "[]")); // Parse friend_list safely
        }
    }, [data, user]);

    if ( !data[user]) {
        return (
            <div
                className={`${
                    theme === "dark" ? "bg-gray-800 " : "bg-white "
                } h-[100vh] `}
            >
                <NavBarSkeleton />
                <ChatShowSkeleton />
                <ChatShowSkeleton />
                <ChatShowSkeleton />
                <ChatShowSkeleton />
                <ChatShowSkeleton />
                <ChatShowSkeleton />
                <ChatShowSkeleton />
            </div>
        );
    }

    return (
        <div
            className={`${
                theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
            } h-[100vh]`}
        >
            <NavBar
                theme={theme}
                toggleTheme={toggleTheme}
                userProfile={userProfile}
                setList={setList}
                data={data}
            />

            <ChatList theme={theme} list={list} data={data} />
        </div>
    );
};

export default HomePage;
