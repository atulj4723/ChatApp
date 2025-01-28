import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// initialize all firebase function 
const firebaseConfig = {
    apiKey: "AIzaSyBQt6O5eakpdGYI8-K-99u6dOVB5gXsL4U",
    authDomain: "chatapp-atul.firebaseapp.com",
    databaseURL: "https://chatapp-atul-default-rtdb.firebaseio.com",
    projectId: "chatapp-atul",
    storageBucket: "chatapp-atul.appspot.com",
    messagingSenderId: "631758941994",
    appId: "1:631758941994:web:8c43db1a08594dd6777853",
    measurementId: "G-XM2P4X4TT6"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);
export const auth = getAuth(app);
