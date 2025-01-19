import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { onValue, ref, query, limitToLast } from "firebase/database";
const ChatShow = ({ theme, data }) => {
    const navigate = useNavigate();
    const user = window.localStorage.getItem("user");
    const [show, setShow] = useState(false);
    const [value, setValue] = useState();
    const id = user < data.uid ? user + data.uid : data.uid + user;
    useEffect(() => {
        const messageRef = ref(db, "message/" + id);

        // Attach a Firebase listener
        onValue(
            messageRef,
            snapshot => {
                const messages = snapshot.val();

                const arry = Object.keys(messages);
                const msg = messages[arry.at(-1)];
                setValue(msg.message);
                if (msg.receiver === user && msg.isSeen == false) {
                   
                    setShow(true);
                }
            },
            error => {
                console.error("Error fetching messages:", error.message);
            }
        );

        // Cleanup listener on component unmount
    }, [id]);
    if (!value) {
        return <></>;
    }
    return (
        <div
            className={`flex items-center p-3 rounded-lg shadow-md h-20 hover:cursor-pointer transition-all ${
                theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-white hover:bg-blue-100 text-gray-800"
            }`}
            onClick={() => {
                navigate("/messages");
                window.localStorage.setItem("receiver", data.uid);
            }}
        >
            <img
                src={data.profile_picture}
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
                    {data.username}
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
                ${show ? " opacity-100 " : "opacity-0"}`}
            ></div>
        </div>
    );
};

export default ChatShow;
