import React from "react";
import { useNavigate } from "react-router-dom";
const NotPageFound = () => {
    const navigate = useNavigate();
   return (
        <div className="w-[100vw] h-[100vh] bg-gray-900 flex flex-col justify-center items-center text-white">
            {/* Title */}
            <h1 className="text-9xl font-extrabold text-blue-500">404</h1>
            <h2 className="text-3xl mt-4 font-bold">Page Not Found</h2>
            <p className="text-lg text-gray-300 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>

            {/* Navigation Button */}
            <button
                onClick={() => navigate("/")}
                className="mt-6 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
            >
                Go Back to Home
            </button>

                    </div>
    );
};

export default NotPageFound;
