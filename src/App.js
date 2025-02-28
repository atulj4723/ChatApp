import "./input.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import SignUp from "./components/SignUp.jsx";
import LogInPage from "./components/LogInPage.jsx";
import Desktop from "./components/Desktop.jsx";
import HomePage from "./components/HomePage.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
import NotPageFound from "./components/NotPageFound.jsx";
import { DataContext } from "./DataContext.jsx";
import { onValue, ref } from "firebase/database";
import { db, auth } from "./firebase.js";
function App() {
    //load data when webpage reload
    const { data, setData, messages, setMessages, setUser, user } =
        useContext(DataContext);
    const userRef = ref(db, "users");
    const messageRef = ref(db, "message");
    const navigate = useNavigate();
    useEffect(() => {
        //function automatically load data on change
        onValue(userRef, (snapshot) => {
            setData(snapshot.val());
        });
        onValue(messageRef, (snapshot) => {
            setMessages(snapshot.val());
        });
    }, []);
    const tmp = window.localStorage.getItem("theme") || "light"; //load theme when application start
    const [theme, setTheme] = useState(tmp);
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    

    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await auth.currentUser;
            if (currentUser) {
                setUser(currentUser.uid);
            }
        };
        loadUser();
    }, [auth.currentUser, user,navigate,auth]);

    return (
        <div className={`${theme === "dark" ? "bg-gray-800 " : "bg-white "}`}>
            <Routes>
                {
                    //for signup and login page
                    !user ? (
                        <>
                            <Route
                                path="/"
                                element={
                                    <SignUp setTheme={setTheme} theme={theme} />
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <LogInPage
                                        setTheme={setTheme}
                                        theme={theme}
                                    />
                                }
                            />
                        </>
                    ) : //for desktop and home page
                    width > 650 ? (
                        <>
                            <Route
                                path="/desktop"
                                element={
                                    <Desktop
                                        setTheme={setTheme}
                                        theme={theme}
                                    />
                                }
                            />
                            <Route path="/" element={<Navigate to="/desktop" />} />
                            <Route path="/home" element={<Navigate to="/desktop" />} />
                            <Route
                                path="/messages"
                                element={<Navigate to="/desktop" />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/home"
                                element={
                                    <HomePage
                                        setTheme={setTheme}
                                        theme={theme}
                                        active={true}
                                    />
                                }
                            />
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route
                                path="/messages"
                                element={
                                    <ChatMessages
                                        setTheme={setTheme}
                                        theme={theme}
                                    />
                                }
                            />
                            <Route
                                path="/desktop"
                                element={<Navigate to="/home" />}
                            />
                        </>
                    )
                }

                {
                    //for page not found
                }
                <Route path="/*" element={<NotPageFound />} />
            </Routes>
        </div>
    );
}

export default App;
