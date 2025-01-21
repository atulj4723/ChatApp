import ChatShow from "./ChatShow.jsx";

const RequestList = ({ theme, data, list }) => {
    return (
        <div className="p-3 flex flex-col gap-2 ">
            {list.length == 0 ? (
                <div className="flex justify-center items-center h-[80%] ">
                    No Friends yet
                </div>
            ) : (
                list.map(cur => {
                    return <ChatShow theme={theme} data1={data[cur]} />;
                })
            )}
        </div>
    );
};

export default RequestList;
