import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ theme, setTheme }) {
    const [imgPath, setimgPath] = useState("");
   

    const navigate = useNavigate();

    const handleFileChange = e => {
        setimgPath(URL.createObjectURL(e.target.files[0]));
    };

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <div
            className={`w-[100vw] min-h-[100vh] flex justify-center items-center transition-all ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800"
            }`}
        >
            <div
                className={`${
                    theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                } rounded-2xl border-2 ${
                    theme === "dark" ? "border-gray-600" : "border-gray-300"
                } flex flex-col gap-4 p-6 justify-center items-center shadow-lg w-[90%] max-w-md`}
            >
                <h1 className="text-4xl font-extrabold text-blue-600">
                    ChatApp
                </h1>

                <div className="relative w-24 h-24">
                    {imgPath ? (
                        <img
                            src={imgPath}
                            alt="user profile"
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-full border-2 border-blue-400"
                        />
                    ) : (
                        <div
                            className={`absolute top-0 left-0 w-full h-full ${
                                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                            } rounded-full flex items-center justify-center ${
                                theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-500"
                            } font-bold`}
                        >
                            +
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Enter Name"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                />
                <input
                    type="text"
                    placeholder="Enter Username"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                />
                <input
                    type="email"
                    placeholder="Enter Email"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                />

                <button
                    className="bg-blue-600 text-white p-3 text-lg font-semibold rounded-lg w-full hover:bg-blue-500 transition-all"
                    onClick={() => navigate("/home")}
                >
                    Sign Up
                </button>
                <p className="text-gray-500 text-2xl ">or</p>
                <button
                    className={`p-3 text-lg font-semibold rounded-lg w-full transition-all ${
                        theme === "dark"
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => navigate("/login")}
                >
                    Log In
                </button>

                <div className="flex justify-between items-center w-full mt-4">
                    <h3 className="text-lg ">Developed By Atul 😎</h3>

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${
                            theme === "dark"
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
