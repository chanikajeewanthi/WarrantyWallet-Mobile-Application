// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYbhMXc16BXcwpP-IDx9_eUPnTx9amWUo",
  authDomain: "warrantywallet-fcd5c.firebaseapp.com",
  projectId: "warrantywallet-fcd5c",
  storageBucket: "warrantywallet-fcd5c.firebasestorage.app",
  messagingSenderId: "214240314240",
  appId: "1:214240314240:web:58098ed8cb6b5cfd0d7765"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)

})

export const db = getFirestore(app)