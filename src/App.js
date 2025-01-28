import "./input.css";
import { Routes, Route } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import SignUp from "./components/SignUp.jsx";
import LogInPage from "./components/LogInPage.jsx";
import Desktop from "./components/Desktop.jsx";
import HomePage from "./components/HomePage.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
import NotPageFound from "./components/NotPageFound.jsx";
import { DataContext } from "./DataContext.jsx";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase.js";
function App() {
    //load data when webpage reload
    const { data, setData, messages, setMessages } = useContext(DataContext);
    const userRef = ref(db, "users");
    const messageRef = ref(db, "message");
    useEffect(() => {
        //function automatically load data on change
        onValue(userRef, snapshot => {
            setData(snapshot.val());
        });
        onValue(messageRef, snapshot => {
            setMessages(snapshot.val());
        });
    }, []);
    const tmp = window.localStorage.getItem("theme") || "light"; //load theme when application start
    const [theme, setTheme] = useState(tmp);

    return (
        <div className={`${theme === "dark" ? "bg-gray-800 " : "bg-white "}`}>
            <Routes>
                <Route
                    path="/"
                    element={<SignUp setTheme={setTheme} theme={theme} />}
                />
                <Route
                    path="/login"
                    element={<LogInPage setTheme={setTheme} theme={theme} />}
                />
                <Route
                    path="/home"
                    element={<HomePage setTheme={setTheme} theme={theme} />}
                />
                <Route
                    path="/desktop"
                    element={<Desktop setTheme={setTheme} theme={theme} />}
                />

                <Route
                    path="/messages"
                    element={<ChatMessages setTheme={setTheme} theme={theme} />}
                />
                {
                    //for page not found
                }
                <Route path="/*" element={<NotPageFound />} />
            </Routes>
        </div>
    );
}

export default App;
