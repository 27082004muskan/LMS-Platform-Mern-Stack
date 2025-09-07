// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEYS,
  authDomain: "loginlms-230a5.firebaseapp.com",
  projectId: "loginlms-230a5",
  storageBucket: "loginlms-230a5.firebasestorage.app",
  messagingSenderId: "318343594388",
  appId: "1:318343594388:web:c07c19ce230a799a0a4f81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider = new GoogleAuthProvider()


export {auth , provider} 