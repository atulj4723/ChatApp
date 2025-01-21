import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../DataContext.jsx";

const ChatShow = ({ theme, data1, request }) => {
    const navigate = useNavigate();
    const user = window.localStorage.getItem("user");
    const id = user < data1.uid ? user + data1.uid : data1.uid + user;
    const { messages } = useContext(DataContext);
    useEffect(() => {
        setValue("");
        if (messages && messages[id]) {
            const msg = messages[id][Object.keys(messages[id]).at(-1)];
            setValue(msg.message);
            if (msg.receiver == user && msg.isSeen == false) {
                setShow(true);
            }
        }
    }, [messages, id]);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(" ");

    if (!messages) {
        return (
            <div
                className={`flex items-center p-3 rounded-lg shadow-md h-20 hover:cursor-pointer transition-all ${
                    theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        : "bg-white hover:bg-blue-100 text-gray-800"
                }`}
                onClick={() => {
                    navigate("/messages");
                    window.localStorage.setItem("receiver", data1.uid);
                }}
            >
                <img
                    src={data1.profile_picture}
                    alt="User Avatar"
                    className={`h-12 w-12 rounded-full border-2 ${
                        theme === "dark" ? "border-gray-500" : "border-blue-400"
                    }`}
                />
                <div className="ml-3 flex-1">
                    <h2
                        className={`font-bold ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                    >
                        {data1.username}
                    </h2>
                    <p
                        className={`text-sm truncate ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        lastMsg
                    </p>
                </div>
                <div
                    className={`h-3 w-3 rounded-full ${
                        theme === "dark" ? "bg-gray-500" : "bg-blue-400"
                    }
                ${show ? " opacity-100 " : "opacity-0"}`}
                ></div>
            </div>
        );
    }
    return (
        <div
            className={`flex items-center p-3 rounded-lg shadow-md h-20 hover:cursor-pointer origin-top-right transition-all ${
                theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-white hover:bg-blue-100 text-gray-800"
            }`}
            onClick={() => {
                navigate("/messages");
                window.localStorage.setItem("receiver", data1.uid);
            }}
        >
            <img
                src={data1.profile_picture}
                alt="User Avatar"
                className={`h-12 w-12 rounded-full border-2 ${
                    theme === "dark" ? "border-gray-500" : "border-blue-400"
                }`}
            />
            <div className="ml-3 flex-1">
                <h2
                    className={`font-bold ${
                        theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                    {data1.username}
                </h2>
                <p
                    className={`text-sm truncate ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    {value}
                </p>
            </div>
            <div
                className={`h-3 w-3 rounded-full ${
                    theme === "dark" ? "bg-gray-500" : "bg-blue-400"
                }
                ${show ? " opacity-100 scale-100 " : "opacity-0 scale-0"}`}
            ></div>
            { request?(
            <div
                className={`${
                    request ? " scale-100" : " scale-0 "
                } bg-blue-400 p-1 rounded-xl text-white`}
            >
                Friend Request
            </div>):()}
        </div>
    );
};

export default ChatShow;
