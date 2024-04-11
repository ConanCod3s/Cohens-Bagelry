// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKGRGM4YLESAb5N9YKSmEBxYbIkjSJNrc",
    authDomain: "cohens-bagelry-8c701.firebaseapp.com",
    projectId: "cohens-bagelry-8c701",
    storageBucket: "cohens-bagelry-8c701.appspot.com",
    messagingSenderId: "643418776638",
    appId: "1:643418776638:web:baf9161a64153d1dff5d6f",
    measurementId: "G-529GFS0Y4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
