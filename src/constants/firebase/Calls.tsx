// Required for side-effects
import "firebase/auth";
import { app } from "./Config";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { GoogleAuthProvider, getAuth } from "firebase/auth";

import { getFirestore, collection, setDoc, doc, getDoc, getCountFromServer, getDocs } from "firebase/firestore";

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

export let appImages: any[] = [];

export const getAppImages = async () => {
    const promises = [
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
    ].map((url) => getURL(url));

    const results: any = await Promise.all(promises);

    appImages = results;
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

// Object { selections: (6) […], email: "cohenjl13@gmail.com", phoneNumber: "2404440809", firstName: "Joshua", lastName: "Cohen" }

// export async function placeOrder(props: any) {
export async function setFireBaseDoc({ collectionName, docId, props }: any) {
    /**If we dont send an id than we should create a new doc and generate one */
    if (docId === undefined || docId === null) {
        const newref = doc(collection(db, collectionName));
        props = collectionName === "customers" ? { uid: newref.id, ...props } : props;
        setDoc(newref, props);
    } else {
        setDoc(doc(db, collectionName, docId), props);
    }
}

/**
 * Retrieves a document from Firestore by its ID.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document to retrieve.
 * @returns {Promise<object>} - A promise that resolves to the document data.
 */

export async function getDocumentById({ collectionName, docId }: {
    collectionName: string,
    docId: string
}) {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }
}

export async function getCount(collectionName: string) {
    const count = await getCountFromServer(collection(db, collectionName)).then((res) => {
        return res.data().count;
    });
    return count;
}

// import { collection, doc, setDoc } from "firebase/firestore"; 
// const citiesRef = collection(db, "cities");

export async function getCollection(collectionName: string) {
    const docRef = collection(db, collectionName);
    const snap = await getDocs(docRef);
    const res = snap.docs.map(doc => doc.data());
    return res;
}

export { auth, db, googleProvider, storage }; 