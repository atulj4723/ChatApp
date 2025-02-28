import ChatInfo from "./ChatInfo.jsx";
import MessageList from "./MessageList.jsx";
import MessageSend from "./MessageSend.jsx";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext.jsx";
import { useNavigate } from "react-router-dom";
const ChatMessages = ({ theme }) => {
    const { data, receiver } = useContext(DataContext);
    const navigate = useNavigate();
    // there is no receiver then it will redirect to homepage
    if (receiver == "") {
        navigate("/");
    }
    
    const [btn, setBtn] = useState(false); // according to user friend list set send btn active or deactive
    return (
        <div
            className={`flex flex-col flex-1 justify-center relative h-[100vh]  w-full ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
            }`}
        >
            <ChatInfo theme={theme} data={data[receiver]} />
            <MessageList theme={theme} setBtn={setBtn} />
            <MessageSend theme={theme} btn={btn} />
        </div>
    );
};

export default ChatMessages;
