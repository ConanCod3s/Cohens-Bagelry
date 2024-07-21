import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize Firebase
export const app = initializeApp({
    apiKey: "AIzaSyAKGRGM4YLESAb5N9YKSmEBxYbIkjSJNrc",
    authDomain: "cohens-bagelry-8c701.firebaseapp.com",
    projectId: "cohens-bagelry-8c701",
    storageBucket: "cohens-bagelry-8c701.appspot.com",
    messagingSenderId: "643418776638",
    appId: "1:643418776638:web:baf9161a64153d1dff5d6f",
    measurementId: "G-529GFS0Y4V"
});

// Ignore this until we need it so we can deploy
// @ts-ignore
const analytics = getAnalytics(app);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
// export const appCheck = initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('6LclRQoqAAAAAJMAtg1AQJVk1MlP6jdTyt4peTnD'),
//     isTokenAutoRefreshEnabled: true
// });