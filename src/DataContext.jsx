import { createContext, useState } from "react";
//centralize all required data i.e messages and user details
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [receiver, setReceiver] = useState("");
    const [messages, setMessages] = useState({});
    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                messages,
                setMessages,
                receiver,
                setReceiver
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
