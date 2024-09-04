// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6DP8RSD3SeJs2YqPpoQ1MNnnvO6HHZXw",
  authDomain: "trainee-dragonborn-24t2.firebaseapp.com",
  projectId: "trainee-dragonborn-24t2",
  storageBucket: "trainee-dragonborn-24t2.appspot.com",
  messagingSenderId: "820757723728",
  appId: "1:820757723728:web:d1262bc1e7cbded76fef55",
  measurementId: "G-2DQZ9JYY64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);