// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRFzsLaDc8a2G_LYKd6gq2ctBn7Bbc3bg",
  authDomain: "proyecto-vite-dashboard.firebaseapp.com",
  projectId: "proyecto-vite-dashboard",
  storageBucket: "proyecto-vite-dashboard.appspot.com",
  messagingSenderId: "503485252682",
  appId: "1:503485252682:web:a6d72ae15fb46fdb63d2b3",
  //measurementId: "G-V20GLKH22P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app); // exportamos la base de datos de firebase