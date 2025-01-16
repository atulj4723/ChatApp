import ChatInfo from "./ChatInfo.jsx";
import MessageList from "./MessageList.jsx";
import MessageSend from "./MessageSend.jsx";

const ChatMessages = ({ theme }) => {
    return (
        <div
            className={`flex flex-col justify-center h-[100vh] ${
                theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
            <ChatInfo theme={theme} />
            <MessageList theme={theme} />
            <MessageSend theme={theme} />
        </div>
    );
};

export default ChatMessages;