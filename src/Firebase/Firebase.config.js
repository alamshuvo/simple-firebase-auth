// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDwdoxl_pxrVASs9kQbxHpWBSYSst9tp0",
  authDomain: "user-email-password-auth-eb5ba.firebaseapp.com",
  projectId: "user-email-password-auth-eb5ba",
  storageBucket: "user-email-password-auth-eb5ba.appspot.com",
  messagingSenderId: "653297336995",
  appId: "1:653297336995:web:7be9c60c5b6e468830b516"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;