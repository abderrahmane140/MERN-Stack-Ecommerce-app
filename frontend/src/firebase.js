// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import env from "react-dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "ecommerce-7e337.firebaseapp.com",
    projectId: "ecommerce-7e337",
    storageBucket: "ecommerce-7e337.appspot.com",
    messagingSenderId: "313552982881",
    appId: "1:313552982881:web:39ea58f29331859e2beb20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app