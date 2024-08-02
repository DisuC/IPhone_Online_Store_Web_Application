
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA7dB6iU8oCMyq-dc1RX7Ce_mW18hZoQ20",
    authDomain: "iphone-store-8b8d7.firebaseapp.com",
    projectId: "iphone-store-8b8d7",
    storageBucket: "iphone-store-8b8d7.appspot.com",
    messagingSenderId: "580272738865",
    appId: "1:580272738865:web:9340b3a6d895731806fb10",
    measurementId: "G-KL3ZF87FDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db };
