import Message from "./Message.jsx";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../DataContext.jsx";
const MessageList = ({ theme, setBtn }) => {
    const last = useRef(null);
    const { messages } = useContext(DataContext);

    const sender = window.localStorage.getItem("user");
    const receiver = window.localStorage.getItem("receiver");
    const handle = () => {};
    const [msglist, setmsglist] = useState();
    const id = sender < receiver ? sender + receiver : receiver + sender;
    useEffect(() => {
        if (last.current) {
            last.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [msglist]);
    useEffect(() => {
        if (messages && messages[id]) {
            setmsglist(messages[id]);
        }
    }, [messages, id]);
    if (!messages) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-gray-500">Loading messages...</p>
            </div>
        );
    }
    return (
        <div
            className={`flex flex-col gap-1.5 h-[80vh] pt-[70px] overflow-y-scroll ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
            }`}
        >
            {setBtn(true)}
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
                <button
                    className="text-center h-10 w-40 m-auto rounded-xl text-white bg-blue-400"
                    onClick={() => {
                        handle();
                    }}
                >{
                  setBtn(false)
                }
                    Send Friend Request
                </button>
            )}
            <div ref={last}></div>
        </div>
    );
};

export default MessageList;
