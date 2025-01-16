import Search from "./Search.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ theme, toggleTheme }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    return (
        <div
            className={`p-3 h-auto flex flex-col sticky top-0 z-50 ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-blue-600 text-black"
            }`}
        >
            <div className="flex justify-between items-center">
                <h1 className="font-extrabold text-3xl">ChatApp</h1>

                <div
                    className={`absolute top-[80px] right-5 flex flex-col items-center justify-around w-64 p-5 transition-transform ${
                        show ? "opacity-100 scale-100" : "opacity-0 scale-95 "
                    } origin-top-right ${
                        theme === "dark" ? "bg-gray-700" : "bg-blue-500"
                    } rounded-lg z-40`}
                >
                    <img
                        src="./logo192.png"
                        className="h-20 w-20 rounded-full border-2 border-white"
                        alt="User"
                    />
                    <h2 className="text-xl font-bold">Name</h2>
                    <h3 className="text-lg">username</h3>

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${
                            theme === "dark"
                                ? "bg-gray-800 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                    <button
                        className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg mt-3 hover:bg-blue-200"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Log Out
                    </button>
                </div>

                <button
                    className="p-2 bg-blue-500 rounded-full text-white flex flex-col gap-1 justify-center items-center"
                    onClick={() => setShow(!show)}
                >
                    <div
                        className={`transition-transform ${
                            show ? "rotate-45  absolute  " : ""
                        } w-6 h-1 bg-white`}
                    ></div>
                    <div
                        className={`transition-all ${
                            show ? "opacity-0" : "opacity-100"
                        } w-6 h-1 bg-white`}
                    ></div>
                    <div
                        className={`transition-transform ${
                            show ? "-rotate-45  absolute " : ""
                        } w-6 h-1 bg-white`}
                    ></div>
                </button>
            </div>

            
            <div className="mt-2">
                <Search />
            </div>
        </div>
    );
};

export default NavBar;
