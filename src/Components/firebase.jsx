// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import App from "../App";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3p46w3D-65CeEOPZeaImLvnnAxlYRa9U",
  authDomain: "kraft-six.firebaseapp.com",
  projectId: "kraft-six",
  storageBucket: "kraft-six.appspot.com",
  messagingSenderId: "1052588321186",
  appId: "1:1052588321186:web:4fb0bf68e83e0726256afb",
  measurementId: "G-22Q68DDVMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth= getAuth()

export default app