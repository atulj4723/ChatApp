import ChatInfo from "./ChatInfo.jsx";
import MessageList from "./MessageList.jsx";
import MessageSend from "./MessageSend.jsx";
const ChatMessages = () => {
    return (
        <div className="flex flex-col justify-center ">
            <ChatInfo />
            <MessageList />
            <MessageSend />
        </div>
    );
};
export default ChatMessages;
