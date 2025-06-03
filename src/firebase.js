// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlkuTZnBgSs9mSWUpDG79V2cGMqMwAF0A",
    authDomain: "thedoor-25679.firebaseapp.com",
    projectId: "thedoor-25679",
    storageBucket: "thedoor-25679.firebasestorage.app",
    messagingSenderId: "472841789931",
    appId: "1:472841789931:web:c26114539588ebc70639ae",
    measurementId: "G-39R6X981EF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);