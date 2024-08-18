// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwQVoooq1uWnmqyPF5CMeD5wstA085t34",
    authDomain: "car-rental-bk.firebaseapp.com",
    projectId: "car-rental-bk",
    storageBucket: "car-rental-bk.appspot.com",
    messagingSenderId: "146726723723",
    appId: "1:146726723723:web:29edc53de4c45bba5d748e",
    measurementId: "G-TGCY6HENYQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
