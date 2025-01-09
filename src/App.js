import "./input.css";
import { Routes, Route, Router } from "react-router-dom";
import SignInPage from "./components/SignInPage.jsx";
import LogInPage from "./components/LogInPage.jsx";
import HomePage from "./components/HomePage.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
function App() {
    return (
        
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/messages" element={<ChatMessages />} />
            </Routes>
        
    );
}

export default App;
