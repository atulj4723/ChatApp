const Message = ({ sender, seen, theme }) => {
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
                        : " bg-blue-200"
                }`}
            >
                Message
                <div className="flex text-xs justify-end gap-1">
                    3:45
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
