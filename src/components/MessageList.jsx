import Message from "./Message.jsx";

const MessageList = ({ theme }) => {
    return (
        <div
            className={`flex flex-col gap-1.5 h-[100vh] pt-[70px] overflow-y-scroll ${
                theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
        >
            <Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} />
            <Message sender={true} seen={false} theme={theme} />
            <Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} /><Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} />
            <Message sender={true} seen={false} theme={theme} />
            <Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} /><Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} />
            <Message sender={true} seen={false} theme={theme} />
            <Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} /><Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} />
            <Message sender={true} seen={false} theme={theme} />
            <Message sender={true} seen={true} theme={theme} />
            <Message sender={false} seen={false} theme={theme} />
        </div>
    );
};

export default MessageList;
