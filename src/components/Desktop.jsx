import HomePage from "./HomePage.jsx";
import ChatMessages from "./ChatMessages.jsx";
import { useContext } from "react";
import { DataContext } from "../DataContext.jsx";
const Desktop = ({ theme, setTheme }) => {
    const { receiver } = useContext(DataContext);
    return (
        <div className="flex flex-1">
            <HomePage setTheme={setTheme} theme={theme} />
            {receiver ? (
                <ChatMessages setTheme={setTheme} theme={theme} />
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <h2 className="text-xl font-bold">
                        Please select a conversation to start messaging.
                    </h2>
                </div>
            )}
        </div>
    );
};
export default Desktop;
