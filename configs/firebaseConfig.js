// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-4d2e6.firebaseapp.com",
  projectId: "car-marketplace-4d2e6",
  storageBucket: "car-marketplace-4d2e6.appspot.com",
  messagingSenderId: "574815808632",
  appId: "1:574815808632:web:c16f095e1129788bf5518d",
  measurementId: "G-L2TH1ZKHT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);