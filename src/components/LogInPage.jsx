import React from "react";
import { useNavigate } from "react-router-dom";
import google from "./google.png";
function LogInPage() {
    const navigate = useNavigate();
    return (
        <div className="w-[100vw] bg-slate-900 h-[100vh] flex justify-center items-center">
            <div className="bg-blue-300  rounded-2xl border-2 border-blue-700 flex flex-col gap-2 p-5 justify-center items-center shadow-xl shadow-blue-200">
                <h1 className="text-6xl font-extrabold mb-4 ">ChatApp</h1>
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="rounded-2xl bg-transparent border-b-2 border-blue-200 placeholder:p-2 placeholder:text-white
                   outline-0 p-2"
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="rounded-2xl bg-transparent border-b-2 border-blue-200 placeholder:p-2 placeholder:text-white
                   outline-0 p-2"
                />
                <button className="bg-blue-900 p-3 text-xl font-bold rounded-3xl pl-7 pr-7" onClick={() => {
                        navigate("/home");
                    }}>
                    LogIn
                </button>
                or
                <button
                    className="bg-blue-900 p-3 text-xl font-bold rounded-3xl pl-7 pr-7"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    SignIn
                </button>
                <h3>Developed By Atul😎</h3>
            </div>
        </div>
    );
}
export default LogInPage;
