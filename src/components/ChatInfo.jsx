const ChatInfo = ({ theme, data }) => {
  // skeleton if data is not received ir loaded
    if (!data) {
        return (
            <div className="flex items-center p-3 justify-start rounded-lg shadow-md fixed top-0 w-full  h-[70px] bg-gray-300 animate-pulse">
                <div className="h-14 w-14 rounded-full border-2 bg-gray-200 animate-pulse "></div>
                <div className="ml-3  flex flex-col gap-1 ">
                    <h2 className="w-10 h-6 rounded bg-gray-200 animate-pulse"></h2>
                    <p className="w-20 h-6 bg-gray-200 animate-pulse rounded "></p>
                </div>
            </div>
        );
    }
    return (
        <div
            className={`flex p-1 items-center justify-start h-[10vh] pl-4 gap-4 absolute w-[100%] top-0 ${
                theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-blue-200 text-black"
            }`}
        >
            <img
                src={data.profile_picture}
                className={`w-14 h-14 rounded-full bg-black border-2  ${
                    theme === "dark" ? "border-white" : " border-blue-500"
                }`}
                alt="User"
            />
            <div className="">
                <h1 className="text-xl">{data.name}</h1>
                <h3 className="opacity-50">{data.username}</h3>
            </div>
        </div>
    );
};

export default ChatInfo;
