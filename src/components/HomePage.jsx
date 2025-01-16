import NavBar from "./NavBar.jsx";
import ChatList from "./ChatList.jsx";

const HomePage = ({ setTheme, theme }) => {
    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <div
            className={
                theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
            }
        >
            <NavBar theme={theme} toggleTheme={toggleTheme} />
            <ChatList theme={theme} />
        </div>
    );
};

export default HomePage;
