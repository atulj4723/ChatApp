import Message from "./Message.jsx";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../DataContext.jsx";
import { set, ref } from "firebase/database";
import { db } from "../firebase.js";
const MessageList = ({ theme, setBtn }) => {
    const last = useRef(null);
    const { messages, data } = useContext(DataContext);
    const [friend_list, setFriend_list] = useState([]);
    const [request_list, setRequest_list] = useState([]);
    const sender = window.localStorage.getItem("user");
    const receiver = window.localStorage.getItem("receiver");
    const [list, setList] = useState([]);
    useEffect(() => {
        if (data && data[sender] && data[receiver]) {
            setFriend_list(JSON.parse(data[sender].friend_list||"[]"));
            setRequest_list(JSON.parse(data[sender].request_list||"[]"));
            setList(JSON.parse(data[receiver].request_list||"[]") );
        }
    }, [data]);
    const handle1 = () => {
        let list1 = request_list.filter(cur => {
            return cur != receiver;
        });
        set(ref(db, "users/" + sender), {
            username: data[sender].username,
            name: data[sender].name,
            profile_picture: data[sender].profile_picture,
            friend_list: data[sender].friend_list,
            request_list: JSON.stringify(list1),
            uid: sender
        });
    };
    const handle2 = () => {
        setBtn(true);
        let list1 = friend_list;
        list1.unshift(receiver);
        let list3 = request_list.filter(cur => {
            return cur != receiver;
        });
        list1 = [...new Set(list1)];
        set(ref(db, "users/" + sender), {
            username: data[sender].username,
            name: data[sender].name,
            profile_picture: data[sender].profile_picture,
            friend_list: JSON.stringify(list1),
            request_list: JSON.stringify(list3),
            uid: sender
        });
        let list2 = JSON.parse(data[receiver].friend_list ||"[]");
        list2.unshift(sender);
        list2 = [...new Set(list2)];
        set(ref(db, "users/" + receiver), {
            username: data[receiver].username,
            name: data[receiver].name,
            profile_picture: data[receiver].profile_picture,
            friend_list: JSON.stringify(list2),
            request_list: data[receiver].request_list,
            uid: receiver
        });
    };
    const handle = () => {
        let list1 = list;
        list1.unshift(sender);
        list1 = [...new Set(list1)];
        set(ref(db, "users/" + receiver), {
            username: data[receiver].username,
            name: data[receiver].name,
            profile_picture: data[receiver].profile_picture,
            friend_list: data[receiver].friend_list,
            request_list: JSON.stringify(list1),
            uid: receiver
        });
    };
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

    if (!messages && !data) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-gray-500">Loading messages...</p>
            </div>
        );
    }

    if (!friend_list.includes(receiver) && !request_list.includes(receiver)) {
        return (
            <div
                className="text-center h-10 w-40 m-auto rounded-xl grid items-center text-white bg-blue-400"
                onClick={() => {
                    handle();
                }}
            >
                {setBtn(false)}
                Send friend request
            </div>
        );
    }
    if (!friend_list.includes(receiver) && request_list.includes(receiver)) {
        return (
            <div className=" w-full flex justify-center ">
                {setBtn(false)}
                <button
                    className="text-center h-10 w-40 m-auto rounded-xl grid items-center text-white bg-green-400"
                    onClick={() => {
                        handle2();
                    }}
                >
                    Accept Request
                </button>
                <button
                    className="text-center h-10 w-40 m-auto rounded-xl grid items-center text-white bg-red-400"
                    onClick={() => {
                        handle1();
                    }}
                >
                    Reject Request
                </button>
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
                <div className="text-center h-10 w-40 m-auto ">
                    {setBtn(true)}
                    No messages yet
                </div>
            )}
            <div ref={last}></div>
        </div>
    );
};

export default MessageList;
