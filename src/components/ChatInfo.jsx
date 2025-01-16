const ChatInfo = ({ theme }) => {
    return (
        <div
            className={`flex p-1 items-center justify-start h-[70px] pl-4 gap-4 fixed w-[100%] top-0 ${
                theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-blue-200 text-black"
            }`}
        >
            <img
                src="./logo192.png"
                className="w-10 h-10 rounded-full bg-black"
                alt="User"
            />
            <h2 className="">Name</h2>
        </div>
    );
};

export default ChatInfo;
