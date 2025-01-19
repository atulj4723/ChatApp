import { useState } from "react";

const NavBarSkeleton = () => {
    return (
        <div className="p-3 animate-pulse h-auto flex flex-col sticky top-0 z-50 bg-gray-300 ">
            <div className="flex justify-between animate-pulse items-center">
                <h1 className=" animate-pulse bg-gray-200 rounded  w-[117px] h-9 "></h1>

                <button className=" animate-pulse bg-gray-200 rounded-full h-9 w-10 "></button>
            </div>

            <div className="animate-pulse mt-2 bg-gray-200 w-full h-12 rounded"></div>
        </div>
    );
};

export default NavBarSkeleton;
