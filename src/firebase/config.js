// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeiXDL3Cd977QyhoKIQCSS5CUjtomJDfA",
  authDomain: "abubakr-ead8c.firebaseapp.com",
  projectId: "abubakr-ead8c",
  storageBucket: "abubakr-ead8c.firebasestorage.app",
  messagingSenderId: "1037879130674",
  appId: "1:1037879130674:web:f145b12bd3f20410539a2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);