import ChatShow from "./ChatShow.jsx";

const ChatList = ({ theme, data, list, list1 ,active}) => {
    return (
        // map all Friends request on top
        <div className="p-3 flex flex-col gap-2 h-[85vh] overflow-scroll no-scrollbar">
            {list1.length === 0 ? (
                <div></div>
            ) : (
                list1.map((cur) => {
                    return (
                        <ChatShow
                            key={cur}
                            theme={theme}
                            data1={data[cur]}
                            request={true}
                            active={active}
                        />
                    );
                })
            )}

            {
                //map all friends or users searched
                list.length === 0 ? (
                    <div className="flex justify-center items-center h-[80%] ">
                        No Friends yet
                    </div>
                ) : (
                    list.map((cur) => {
                        return (
                            <ChatShow
                                key={cur}
                                theme={theme}
                                data1={data[cur]}
                                request={false}
                                active={active}
                            />
                        );
                    })
                )
            }
        </div>
    );
};

export default ChatList;
