// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALLoSh9-hrbsLdlPXPiucbX9YXcJ5zLdU",
  authDomain: "car-rental-service-3a6ae.firebaseapp.com",
  projectId: "car-rental-service-3a6ae",
  storageBucket: "car-rental-service-3a6ae.firebasestorage.app",
  messagingSenderId: "992711913820",
  appId: "1:992711913820:web:150cd0810b7fec4ae81199"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);