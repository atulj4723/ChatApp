import { db } from "../firebase.js";
import { set, ref } from "firebase/database";
const Message = ({ sender1, seen, theme, msg, receiver, time }) => {
    const user = window.localStorage.getItem("user");
    let tmp = Date.parse(JSON.parse(time));
    const actualTime = new Date(tmp).toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });
    const sender=sender1===user;
    const id = sender1 < receiver ? sender1 + receiver : receiver + sender1;
    if (receiver == user) {
        let time2 = Date.parse(JSON.parse(time));
        set(ref(db, "message/" + id + "/" + time2), {
            sender: sender1,
            receiver: receiver,
            isSeen: true,
            time: time,
            message: msg
        });
    }
    return (
        <div
            className={`w-[100%] flex p-2 ${
                sender ? `justify-end ` : `justify-start`
            }`}
        >
            <div
                className={`max-w-[60%] p-1 pr-2 pl-2 rounded-2xl ${
                    theme === "dark"
                        ? "bg-gray-600  text-white"
                        : " bg-blue-200 text-black"
                }`}
            >
                {msg}
                <div className="flex text-xs justify-end gap-1">
                    {actualTime}
                    {sender ? (
                        <div className="flex items-center gap-[1px] ">
                            <h1
                                className={`w-2 rounded-full h-2 ${
                                    theme === "dark"
                                        ? "bg-gray-400"
                                        : "bg-blue-600"
                                }`}
                            ></h1>
                            {seen ? (
                                <h1
                                    className={`w-2 rounded-full h-2 ${
                                        theme === "dark"
                                            ? "bg-gray-400"
                                            : "bg-blue-600"
                                    }`}
                                ></h1>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
