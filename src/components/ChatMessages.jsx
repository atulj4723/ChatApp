import ChatInfo from "./ChatInfo.jsx";
import MessageList from "./MessageList.jsx";
import MessageSend from "./MessageSend.jsx";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext.jsx";
const ChatMessages = ({ theme }) => {
    const receiver = window.localStorage.getItem("receiver");

    const { data, setData } = useContext(DataContext);
    const [btn, setBtn] = useState(false);
    return (
        <div
            className={`flex flex-col justify-center h-[100vh] ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
            }`}
        >
            <ChatInfo theme={theme} data={data[receiver]} />
            <MessageList theme={theme} setBtn={setBtn}/>
            <MessageSend theme={theme} btn={btn} />
        </div>
    );
};

export default ChatMessages;
