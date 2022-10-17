// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2yZlrE_LGzDX9iJpQ5IKEgeVX1L03O4o",
  authDomain: "linkhedin-tpaweb.firebaseapp.com",
  projectId: "linkhedin-tpaweb",
  storageBucket: "linkhedin-tpaweb.appspot.com",
  messagingSenderId: "926290693145",
  appId: "1:926290693145:web:42151415b1dfce7c69ae88",
  measurementId: "G-GZX35DP43X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);