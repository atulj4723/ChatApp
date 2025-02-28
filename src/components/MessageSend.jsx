import { useRef, useState, useContext } from "react";
import { db } from "../firebase.js";
import { DataContext } from "../DataContext.jsx";
import { ref, set } from "firebase/database";

const MessageSend = ({ theme, btn }) => {
    const { data, receiver, user } = useContext(DataContext);
    const textarea = useRef(null);
    const [val, setVal] = useState("");

    const sender = user;
    const handleval = (e) => {
        setVal(e.target.value); // Adjust height of input tag
        if (textarea.current) {
            textarea.current.style.height = "auto"; // Reset height
            textarea.current.style.height =
                textarea.current.scrollHeight + "px"; // Adjust to scrollHeight
        }
    };
    const handle = () => {
        //send data to db
        const time = new Date();
        const msg = {
            //msg object
            sender: sender,
            receiver: receiver,
            message: val,
            isSeen: false,
            time: JSON.stringify(time),
        };
        const id = sender < receiver ? sender + receiver : receiver + sender; //id store data
        let senderlist = JSON.parse(data[sender].friend_list) || [];
        senderlist.unshift(receiver);
        senderlist = [...new Set(senderlist)]; //update sender friend_list so it get frist current receiver on chatlist
        let receiverlist = JSON.parse(data[receiver].friend_list) || [];
        receiverlist.unshift(sender);
        receiverlist = [...new Set(receiverlist)]; // similar to sender
        set(ref(db, "users/" + sender), {
            name: data[sender].name,
            username: data[sender].username,
            profile_picture: data[sender].profile_picture,
            uid: data[sender].uid,
            friend_list: JSON.stringify(senderlist), //set updated friend_list
            request_list: data[sender].request_list,
        });
        set(ref(db, "users/" + receiver), {
            name: data[receiver].name,
            username: data[receiver].username,
            profile_picture: data[receiver].profile_picture,
            uid: data[receiver].uid,
            friend_list: JSON.stringify(receiverlist), //same as sender
            request_list: data[receiver].request_list,
        });
        set(ref(db, "message/" + id + "/" + time.getTime()), msg) //save data to db
            .then(() => {
                setVal("");
            })
            .catch((err) => {
                alert(err.code);
            });
    };
    return (
        <div
            className={`h-[10vh] flex justify-between items-center p-1 absolute bottom-0 w-[100%] ${
                theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-blue-100 text-black"
            }`}>
            <div className="w-[70%] h-[100%] relative">
                <textarea
                    placeholder="Enter your message ...."
                    rows={1}
                    ref={textarea}
                    className={`resize-none overflow-hidden border-b-2 rounded-xl p-1.5 pl-3 pr-3 outline-0 w-[100%] text-xl absolute bottom-[10px] left-3 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-blue-200 border-blue-100 text-black"
                    }`}
                    value={val}
                    onChange={handleval}
                    style={{
                        height: "auto",
                        overflow: "hidden", // Ensures scrollbar doesn't appear
                    }}></textarea>
            </div>
            <button
                className={`p-1.5 rounded-full w-20 h-10 font-extrabold ${
                    theme === "dark"
                        ? "bg-gray-600 text-white hover:bg-gray-500"
                        : "bg-blue-400 text-white hover:bg-blue-500"
                }`}
                onClick={() => {
                    if (btn) {
                        handle();
                    }
                }}>
                Send
            </button>
        </div>
    );
};

export default MessageSend;
