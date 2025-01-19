const ChatShowSkeleton = () => {
    return (
        <div className="flex items-center p-3 rounded-lg shadow-md mt-2 h-20 bg-gray-300 animate-pulse">
            <div className="h-12 w-12 rounded-full border-2 bg-gray-200 animate-pulse "></div>
            <div className="ml-3 flex-1 flex flex-col gap-1 ">
                <h2 className="w-10 h-6 rounded bg-gray-200 animate-pulse"></h2>
                <p className="w-20 h-6 bg-gray-200 animate-pulse rounded "></p>
            </div>
            <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
    );
};

export default ChatShowSkeleton;
