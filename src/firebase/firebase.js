// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import {getDatabase, ref, push, onValue, remove} from "firebase/database"
// import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATbjB97MFqX7GQ3O85UGUF9IIBN4bhdVI",
  authDomain: "weather-app-bcc26.firebaseapp.com",
  projectId: "weather-app-bcc26",
  storageBucket: "weather-app-bcc26.appspot.com",
  messagingSenderId: "658888927124",
  appId: "1:658888927124:web:e6a447487937ecbbd61181",
  measurementId: "G-2ZYCVHTH7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
