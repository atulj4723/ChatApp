import { useRef, useState } from "react";

const MessageSend = ({ theme }) => {
    const textarea = useRef(null);
    const [val, setVal] = useState("");

    const handleval = (e) => {
        setVal(e.target.value);
        if (textarea.current) {
            textarea.current.style.height = "auto"; // Reset height
            textarea.current.style.height = textarea.current.scrollHeight + "px"; // Adjust to scrollHeight
        }
    };

    return (
        <div
            className={`h-[70px] flex justify-between items-center p-1 fixed bottom-0 w-[100%] ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-100 text-black"
            }`}
        >
            <div className="w-[70%] h-[100%] relative">
                <textarea
                    placeholder="Enter your message ...."
                    rows={1}
                    ref={textarea}
                    className={`border-b-2 rounded-xl p-1.5 pl-3 pr-3 outline-0 w-[100%] text-xl scrollbar-hidden absolute bottom-[10px] left-3 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-blue-200 border-blue-100 text-black"
                    }`}
                    value={val}
                    onChange={handleval}
                ></textarea>
            </div>
            <button
                className={`p-1.5 rounded-full w-20 h-10 font-extrabold ${
                    theme === "dark"
                        ? "bg-gray-600 text-white hover:bg-gray-500"
                        : "bg-blue-400 text-white hover:bg-blue-500"
                }`}
            >
                Send
            </button>
        </div>
    );
};

export default MessageSend;
