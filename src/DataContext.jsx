import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [messages, setMessages] = useState({});
    return (
        <DataContext.Provider value={{ data, setData, messages, setMessages }}>
            {children}
        </DataContext.Provider>
    );
};
