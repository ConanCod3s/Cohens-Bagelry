// Required for side-effects
import "firebase/auth";
import { app } from "./Config";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { GoogleAuthProvider, getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


// Initialize Cloud Firestore and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const functions = getFunctions();

export const makeRoleForUser = httpsCallable(functions, "makeRoleForUser");
export const updateUserProfile = httpsCallable(functions, "updateUserProfile");

export const createUserDocument = httpsCallable(
    functions,
    "createUserDocument"
);

// Store values
export const staff = [];
export const users = [];
export const events = [];
export const athletes = [];
export const downloadedItems = [];

export const appImages: any[] = [];

export const getAppImages = async () => {
    const imgs = [
        "gs://cohens-bagelry-8c701.appspot.com/Step_1.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_2.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_3.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_4.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_5.1.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_5.2.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_6.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_7.1.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_7.2.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_8.1.jpg",
        "gs://cohens-bagelry-8c701.appspot.com/Step_8.2.jpg",
    ];

    const promises = imgs.map((img) => getURL(img));
    const results: any = await Promise.all(promises);
    appImages.push(...results);

}

export async function getURL(imgPath: string) {
    let downloadedItem = "";

    const storageRef = ref(storage, imgPath);

    await getDownloadURL(storageRef)
        .then((url) => {
            downloadedItem = url;
            return;
        })
        .catch((error: object) => {
            console.error('getURL: ', error)
            return "";
        });
    return downloadedItem;
}

export { auth, db, googleProvider, storage };