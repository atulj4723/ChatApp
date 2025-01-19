import Message from "./Message.jsx";
import { db } from "../firebase.js";
import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
const MessageList = ({ theme }) => {
    const last = useRef(null);
    const sender = window.localStorage.getItem("user");
    const receiver = window.localStorage.getItem("receiver");
    const [msglist, setmsglist] = useState();
    const id = sender < receiver ? sender + receiver : receiver + sender;
    useEffect(() => {
        // Scroll to the bottom whenever the message list changes
        if (last.current) {
            last.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [msglist]);
    useEffect(() => {
        const messageRef = ref(db, "message/" + id);

        onValue(messageRef, snapshot => {
            const messages = snapshot.val();
            setmsglist(messages || []);
        });
    }, []);
    return (
        <div
            className={`flex flex-col gap-1.5 h-[80vh] pt-[70px] overflow-y-scroll ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
            }`}
        >
            {msglist && Object.keys(msglist).length > 0 ? (
                Object.entries(msglist).map(([key, message]) => (
                    <Message
                        receiver={message.receiver}
                        sender1={message.sender}
                        seen={message.isSeen}
                        msg={message.message}
                        time={message.time}
                    />
                ))
            ) : (
                <p className="text-center text-gray-500">No messages yet.</p>
            )}
            <div ref={last}></div>
        </div>
    );
};

export default MessageList;
