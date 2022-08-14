// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKNd-kuS-mgQtUFMnutu7nBPoKfnQFY2E",
  authDomain: "blogapp-4880b.firebaseapp.com",
  projectId: "blogapp-4880b",
  storageBucket: "blogapp-4880b.appspot.com",
  messagingSenderId: "1002006166724",
  appId: "1:1002006166724:web:cf531d51f102d9a8331d91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);