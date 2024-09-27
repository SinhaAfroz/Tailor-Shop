// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDP2Ef5KhhDkN4mnBdXajBPdxrCHGsKRXw",
    authDomain: "tailorshopapp-9c946.firebaseapp.com",
    projectId: "tailorshopapp-9c946",
    storageBucket: "tailorshopapp-9c946.appspot.com",
    messagingSenderId: "140367440579",
    appId: "1:140367440579:web:263565fc92529907001076",
    measurementId: "G-ZYK4LFTY42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth

export default app; // Export app as default
export { auth }; // Export auth as named export