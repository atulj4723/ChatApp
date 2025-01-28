import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useState } from "react";
function LogInPage({ theme, setTheme }) {
    const load_user = window.localStorage.getItem("user");

    const navigate = useNavigate();
    if (load_user != "") {
        navigate("/home");
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // switch theme
    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === "dark" ? "light" : "dark";
            window.localStorage.setItem("theme", newTheme);
        });
    };
    const handle = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                window.localStorage.setItem("user", user.uid); //store user id so it can load on home page
                // if user logged in show notification
                toast.success("LogIn Successfull!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
                 navigate("/home");
            })
            .catch(error => {
                const errorCode = error.code;
                //display error while logging in
                toast.error(errorCode.slice(5), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            });
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

                <input
                    type="email"
                    placeholder="Enter Email"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                />

                <button
                    className="bg-blue-600 text-white p-3 text-lg font-semibold rounded-lg w-full hover:bg-blue-500 transition-all"
                    onClick={() => {
                        handle();
                    }}
                >
                    Log In
                </button>
                <p className="text-gray-500 text-2xl ">or</p>
                <button
                    className={`p-3 text-lg font-semibold rounded-lg w-full transition-all ${
                        theme === "dark"
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => navigate("/")}
                >
                    Sign Up
                </button>

                <div className="flex justify-between items-center w-full mt-4">
                    <h3 className="text-sm">Developed By Atul 😎</h3>

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${
                            theme === "dark"
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LogInPage;
