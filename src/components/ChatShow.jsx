import { useNavigate } from "react-router-dom";

const ChatShow = ({ theme }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`flex items-center p-3 rounded-lg shadow-md hover:cursor-pointer transition-all ${
                theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-white hover:bg-blue-100 text-gray-800"
            }`}
            onClick={() => navigate("/messages")}
        >
            <img
                src="./logo512.png"
                alt="User Avatar"
                className={`h-12 w-12 rounded-full border-2 ${
                    theme === "dark" ? "border-gray-500" : "border-blue-400"
                }`}
            />
            <div className="ml-3 flex-1">
                <h2
                    className={`font-bold ${
                        theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                    Name
                </h2>
                <p
                    className={`text-sm truncate ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    Last message
                </p>
            </div>
            <div
                className={`h-3 w-3 rounded-full ${
                    theme === "dark" ? "bg-gray-500" : "bg-blue-400"
                }`}
            ></div>
        </div>
    );
};

export default ChatShow;
