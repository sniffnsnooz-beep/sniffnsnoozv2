import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// ... baki purana code ...
// Step 1 se copy kiya hua config yahan paste karein
const firebaseConfig = {
    apiKey: "AIzaSyBjy4qqoPQr6O_ay_f5_01zHtqcUQrkd2c",
    authDomain: "petgrooming-84093.firebaseapp.com",
    projectId: "petgrooming-84093",
    storageBucket: "petgrooming-84093.firebasestorage.app",
    messagingSenderId: "398676755765",
    appId: "1:398676755765:web:d68cca963c535567b6f87c",
    measurementId: "G-2HN6G71H1W"
};

// Firebase initialize karein (preventing duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore database instance
const db = getFirestore(app);

export { db };
export const storage = getStorage(app);