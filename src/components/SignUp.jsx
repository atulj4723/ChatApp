import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { DataContext } from "../DataContext.jsx";
import {
    uploadBytesResumable,
    ref as storageRef,
    getDownloadURL,
} from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database";
import { storage, db, auth } from "../firebase.js";

function SignUp({ theme, setTheme }) {
    const [imgPath, setImgPath] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUnameFocused, setIsUnameFocused] = useState(false);
    const { data } = useContext(DataContext);
    const [validUser, setValidUser] = useState(false);
    const [usernameAlert, setUserNameAlert] = useState(null);
    const [name, setName] = useState("");
    const [uname, setUname] = useState("");
    const [isSigning, setSigning] = useState(false);
    const navigate = useNavigate();
    const [tmp, setTmp] = useState("");

    const check = (e) => {
        const userList = Object.values(data).map((user) => user.username) || [];
        //check does the user entered value present in current user
        if (userList.includes(e)) {
            setValidUser(false);
            setUserNameAlert("❎ " + e + " is already taken.");
        } else {
            let l = e.length;
            if (l > 4) {
                // check user name length
                setValidUser(true);
                setUserNameAlert("✅ " + e + " is available.");
            } else {
                setUserNameAlert("Username is too short.");
                setValidUser(false);
            }
        }
    };

    const upload = () => {
        const file = tmp;
        // check user has choosen the profile_picture
        if (!file) {
            //show pop up msg to choose user profile
            toast.error("Select Profile Picture", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return; // go back if file is not selected
        }

        try {
            const fileRef = storageRef(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file); //Upload file to firebase storage

            uploadTask.on(
                "state_changed", //check current stage of upload task
                (snapshot) => {
                    switch (snapshot.state) {
                        case "paused":
                            alert("Upload is paused");
                            break;
                        case "running":
                            setSigning(true); //change signin btn animation
                            break;
                    }
                },
                (error) => {
                    // display error
                    toast.error(error.code.slice(5), {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                },
                async () => {
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    ); //get downloadURL of uploaded image
                    if (validUser) {
                        //check valid username
                        if (name != "") {
                            //check for valid name
                            signin(downloadURL);
                        } else {
                            toast.error("Enter Name", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                transition: Bounce,
                            });
                        }
                    } else {
                        toast.error("Enter valid UserName", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            transition: Bounce,
                        });
                    }
                }
            );
        } catch (error) {
            toast.error(error.code.slice(5), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };
    const handleFileChange = (e) => {
        setTmp(e.target.files[0]);
        setImgPath(URL.createObjectURL(e.target.files[0])); //create temporary img path to display user
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        window.localStorage.setItem("theme", newTheme);
    };
    const signin = (downloadURL) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up Successfull
                toast.success("SignUp Successfull!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setSigning(false);
                const user = userCredential.user;
                // store user datata to db
                set(ref(db, "users/" + user.uid), {
                    username: uname,
                    name: name,
                    profile_picture: downloadURL,
                    friend_list: "[]",
                    request_list: "[]",
                    uid: user.uid,
                }).then(() => {
                    navigate("/home");
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                setSigning(false);
                toast.error(errorCode.slice(5), {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            });
    };

    return (
        <div
            className={`w-[100vw] min-h-[100vh] flex justify-center items-center transition-all ${
                theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800"
            }`}>
            <div
                className={`${
                    theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                } rounded-2xl border-2 ${
                    theme === "dark" ? "border-gray-600" : "border-gray-300"
                } flex flex-col gap-4 p-6 justify-center items-center shadow-lg w-[90%] max-w-md`}>
                <h1 className="text-4xl font-extrabold text-blue-600">
                    ChatApp
                </h1>

                <div className="relative w-24 h-24">
                    {imgPath ? (
                        <img
                            src={imgPath}
                            alt="User profile"
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-full border-2 border-blue-400"
                        />
                    ) : (
                        <div
                            className={`absolute top-0 left-0 w-full h-full ${
                                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                            } rounded-full flex items-center justify-center ${
                                theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-500"
                            } font-bold`}>
                            +
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Enter Name"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    placeholder="Enter Username"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }
                    ${!validUser ? "focus:ring-red-400 " : ""}
                    `}
                    onChange={(e) => {
                        setUname(e.target.value);
                        check(e.target.value);
                    }}
                    value={uname}
                    onFocus={() => setIsUnameFocused(true)}
                    onBlur={() => {
                        setUserNameAlert("");

                        setIsUnameFocused(false);
                    }}
                />
                {
                    <h1
                        className={`${
                            !validUser ? "text-red-400 " : "text-green-400"
                        } ${!isUnameFocused ? "hidden" : ""} `}>
                        {usernameAlert}
                    </h1>
                }
                <input
                    type="email"
                    placeholder="Enter Email"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    className={`rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                        theme === "dark"
                            ? "bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 text-white"
                            : "bg-gray-100 border-gray-300 placeholder-gray-500 focus:ring-blue-400 text-gray-800"
                    }`}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <button
                    className="bg-blue-600 text-white p-3 text-lg font-semibold rounded-lg w-full hover:bg-blue-500 transition-all"
                    onClick={() => {
                        upload();
                    }}>
                    {isSigning ? (
                        <div className="flex items-center justify-center animate-pulse ">
                            Signing Up
                            <div className="   "> ...</div>
                        </div>
                    ) : (
                        <>Sign Up</>
                    )}
                </button>
                <p className="text-gray-500 text-2xl ">or</p>
                <button
                    className={`p-3 text-lg font-semibold rounded-lg w-full transition-all ${
                        theme === "dark"
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => {
                        navigate("/login");
                    }}>
                    Log In
                </button>

                <div className="flex justify-between items-center w-full mt-4">
                    <h3 className="text-lg ">Developed By Atul 😎</h3>

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${
                            theme === "dark"
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-200"
                        }`}>
                        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
