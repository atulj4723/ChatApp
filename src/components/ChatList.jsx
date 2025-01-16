import ChatShow from "./ChatShow.jsx";

const ChatList = ({ theme }) => {
    return (
        <div className="p-3 grid grid-cols-1 gap-3">
            {Array(20)
                .fill(null)
                .map((_, idx) => (
                    <ChatShow key={idx} theme={theme} />
                ))}
        </div>
    );
};

export default ChatList;
