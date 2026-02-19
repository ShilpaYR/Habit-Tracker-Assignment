// Firebase Configuration
// Replace these values with your own Firebase project configuration
// You can find these values in the Firebase Console > Project Settings

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDf4FO98v3um-EGRwyrQyQyKofaN283i1U",
    authDomain: "habitflow-3e434.firebaseapp.com",
    projectId: "habitflow-3e434",
    storageBucket: "habitflow-3e434.firebasestorage.app",
    messagingSenderId: "438667464506",
    appId: "1:438667464506:web:d8af2f88f42127fd5c8a03",
    measurementId: "G-DMJ1P8P0KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect to emulators when running locally
if (location.hostname === "localhost") {
    try {
        connectAuthEmulator(auth, "http://localhost:9099");
        connectFirestoreEmulator(db, "localhost", 8080);
        console.log("🔥 Connected to Firebase Emulators");
    } catch (error) {
        console.log("Emulators already connected");
    }
}
