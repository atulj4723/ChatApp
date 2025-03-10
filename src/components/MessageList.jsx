import Message from "./Message.jsx";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../DataContext.jsx";
import { set, ref } from "firebase/database";
import { db } from "../firebase.js";
const MessageList = ({ theme, setBtn }) => {
    const last = useRef(null);
    const { messages, data, receiver, user } = useContext(DataContext);
    const [friend_list, setFriend_list] = useState([]);
    const [request_list, setRequest_list] = useState([]);
    const [receiverRequestList, setReceiverRequsestList] = useState([]);
    const sender = user;

    useEffect(() => {
        if (data && data[sender] && data[receiver]) {
            //set data when sender and receiver data is loaded
            setFriend_list(JSON.parse(data[sender].friend_list || "[]"));
            setRequest_list(JSON.parse(data[sender].request_list || "[]"));
            setReceiverRequsestList(
                JSON.parse(data[receiver].request_list || "[]")
            );
        }
    }, [data]);
    const handle1 = () => {
        let list1 = request_list.filter((cur) => {
            return cur != receiver;
        }); //if friend request is rejected then remove receiver id from request list
        set(ref(db, "users/" + sender), {
            username: data[sender].username,
            name: data[sender].name,
            profile_picture: data[sender].profile_picture,
            friend_list: data[sender].friend_list,
            request_list: JSON.stringify(list1),
            uid: sender,
        });
    };
    const handle2 = () => {
        setBtn(true); //send btn activated as friend request accepted
        let list1 = friend_list;
        list1.unshift(receiver); // add receiver id to users friend list
        let list3 = request_list.filter((cur) => {
            return cur != receiver; //remove receivers id from request_list
        });
        list1 = [...new Set(list1)]; //make list unique
        set(ref(db, "users/" + sender), {
            username: data[sender].username,
            name: data[sender].name,
            profile_picture: data[sender].profile_picture,
            friend_list: JSON.stringify(list1),
            request_list: JSON.stringify(list3),
            uid: sender,
        }); //set updated list
        let list2 = JSON.parse(data[receiver].friend_list || "[]");
        list2.unshift(sender); //similar to user
        list2 = [...new Set(list2)];
        set(ref(db, "users/" + receiver), {
            username: data[receiver].username,
            name: data[receiver].name,
            profile_picture: data[receiver].profile_picture,
            friend_list: JSON.stringify(list2),
            request_list: data[receiver].request_list,
            uid: receiver,
        });
    };
    const handle = () => {
        let list1 = receiverRequestList;
        list1.unshift(sender);
        list1 = [...new Set(list1)]; //send friend request add users id to receivers request_list
        set(ref(db, "users/" + receiver), {
            username: data[receiver].username,
            name: data[receiver].name,
            profile_picture: data[receiver].profile_picture,
            friend_list: data[receiver].friend_list,
            request_list: JSON.stringify(list1),
            uid: receiver,
        });
    };
    const [msglist, setmsglist] = useState();
    const id = sender < receiver ? sender + receiver : receiver + sender;
    useEffect(() => {
        if (last.current) {
            last.current.scrollIntoView({ behavior: "smooth" }); //move to bottom of msglist on update mmsglist
        }
    }, [msglist]);
    useEffect(() => {
        if (messages && messages[id]) {
            setmsglist(messages[id]); //set msg when messages and users messages are loaded
        }
        if (!Object.keys(messages).includes(id)) {
            setmsglist([]);
        }
    }, [messages, id]);

    if (!messages || !data) {
        // if data is not loaded
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-gray-500">Loading messages...</p>
            </div>
        );
    }

    if (
        !friend_list.includes(receiver) &&
        !request_list.includes(receiver) &&
        !receiverRequestList.includes(sender)
    ) {
        //check receiver is present in request_list or friend_list of user or user sent friend request
        return (
            <div
                className="text-center h-10 w-40 m-auto rounded-xl grid items-center text-white bg-blue-400"
                onClick={() => {
                    handle();
                }}>
                {setBtn(false)}
                Send friend request
            </div>
        );
    }
    if (!friend_list.includes(receiver) && request_list.includes(receiver)) {
        return (
            //if receiver send a friend request give to option Accept and reject
            <div className=" w-full flex justify-center ">
                {setBtn(false)}
                <button
                    className="text-center h-10 w-40 m-auto rounded-xl grid items-center text-white bg-green-400"
                    onClick={() => {
                        handle2();
                    }}>
                    Accept Request
                </button>
                <button
                    className="text-center h-10 w-40 m-auto rounded-xl grid items-center text-white bg-red-400"
                    onClick={() => {
                        handle1();
                    }}>
                    Reject Request
                </button>
            </div>
        );
    }
    if (
        !friend_list.includes(receiver) &&
        !request_list.includes(receiver) &&
        receiverRequestList.includes(sender)
    ) {
        //if friend request is sent by user
        return (
            <div className="text-center h-10 w-40 m-auto rounded-xl grid items-center text-white bg-green-400">
                {setBtn(false)}
                Friend Request Send
            </div>
        );
    }
    return (
        <div
            className={`flex flex-col gap-1.5 h-[80vh] pt-[70px] w-full overflow-y-scroll no-scrollbar ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
            }`}>
            {setBtn(true)}
            {msglist && Object.keys(msglist).length > 0 ? (
                Object.entries(msglist).map(([key, message]) => (
                    <Message
                        receiver={message.receiver}
                        sender1={message.sender}
                        key={key}
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
