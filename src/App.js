import "./input.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignUp from "./components/SignUp.jsx";
import LogInPage from "./components/LogInPage.jsx";
import HomePage from "./components/HomePage.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
import NotPageFound from "./components/NotPageFound.jsx";
function App() {
    const [theme, setTheme] = useState("dark");
    return (
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
                path="/messages"
                element={<ChatMessages setTheme={setTheme} theme={theme} />}
            />
            <Route path="/*" element={<NotPageFound />} />
        </Routes>
    );
}

export default App;