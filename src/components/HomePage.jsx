import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar.jsx";
import ChatList from "./ChatList.jsx";
import { DataContext } from "../DataContext.jsx";
import NavBarSkeleton from "./skeleton/NavBarSkeleton.jsx";
import ChatShowSkeleton from "./skeleton/ChatShowSkeleton.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = ({ setTheme, theme ,active}) => {
    const toggleTheme = () => {
        
            const newTheme = theme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            window.localStorage.setItem("theme", newTheme);
        
    };
    const navigate = useNavigate();
    const { data, user } = useContext(DataContext);
    
    //if user not present redirect to signup page

    const [userProfile, setUserProfile] = useState({});
    const [list, setList] = useState([]);
    const [list1, setList1] = useState([]);
    useEffect(() => {
        if (data && user && data[user]) {
            setUserProfile(data[user]); //set user profile
            setList(JSON.parse(data[user].friend_list || "[]")); // Parse friend_list safely
            setList1(JSON.parse(data[user].request_list || "[]")); //parse request_list safely
        }
    }, [data, user]);
    // if user data doesn't present in data or loaded show skeleton
    if (!data[user]) {
        return (
            <div
                className={`${
                    theme === "dark" ? "bg-gray-800 " : "bg-white "
                } h-[100vh] `}>
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
            } h-[100vh] flex-1`}>
            <NavBar
                theme={theme}
                toggleTheme={toggleTheme}
                userProfile={userProfile}
                setList={setList}
                data={data}
            />
            {
                // to show multiple chats
            }
            <ChatList theme={theme} list={list} data={data} list1={list1} active={active}/>
        </div>
    );
};

export default HomePage;
