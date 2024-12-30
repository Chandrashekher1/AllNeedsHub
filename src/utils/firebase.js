// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU6UU2LZmemdA2c6v-9oZKtHAvn72pKb0",
  authDomain: "cpshop03-2be68.firebaseapp.com",
  projectId: "cpshop03-2be68",
  storageBucket: "cpshop03-2be68.firebasestorage.app",
  messagingSenderId: "435697309919",
  appId: "1:435697309919:web:83a6a75eb862651001316a",
  measurementId: "G-CV4T711SNM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
