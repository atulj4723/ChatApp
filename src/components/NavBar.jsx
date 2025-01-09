import Search from "./Search.jsx";
import "./t.css"
import { useState } from "react";
const NavBar = () => {
    const [show, setShow] = useState(true);
    return (
        <div className="bg-blue-100 p-2 h-20 flex flex-col justify-between">
            <div className="flex justify-between items-center h-[50%] pr-3">
                <h1 className="font-extrabold text-3xl p-1">ChatApp</h1>
                {show ? (
                    <button
                        className="p-1.5  bg-blue-500 rounded text-white flex flex-col gap-1  h-6"
                        onClick={() => {
                            setShow(!show);
                        }}
                    >
                        <div className="border-t-2 border-white w-3"></div>
                        <div className="border-t-2 border-white w-3"></div>
                        <div className="border-t-2 border-white w-3"></div>
                    </button>
                ) : (
                    <div
                        className="flex flex-col justify-start items-center w-[400px] mt-[576px] rounded z-10 bg-blue-200 atul  h-[600px] relative"
                        
                    >
                        <button
                            className="p-1.5  bg-blue-500 rounded absolute h-6 right-0 text-white flex flex-col justify-center items-center  w-6"
                            onClick={() => {
                                setShow(!show);
                            }}
                        >
                            <div className="border-b-2 border-white w-5 absolute rotate-[315deg] "></div>
                            <div className="border-t-2 border-white w-3 hidden"></div>
                            <div className="border-t-2 border-white absolute w-5 rotate-45 "></div>
                        </button>
                        <img
                            src="./logo192.png"
                            className="h-[100px] w-[100px] bg-red-100 rounded-full"
                        />
                        <h2 className="text-xl ">Name</h2>

                        <button>LogOut</button>
                    </div>
                )}
            </div>
            <Search />
        </div>
    );
};
export default NavBar;
