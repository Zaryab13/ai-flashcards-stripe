// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt-V8qqF1C4Sw_N7VJqK5yLLr0OD9vX6Q",
  authDomain: "ai-flashcards-137b9.firebaseapp.com",
  projectId: "ai-flashcards-137b9",
  storageBucket: "ai-flashcards-137b9.appspot.com",
  messagingSenderId: "938595469413",
  appId: "1:938595469413:web:88f40977b8e6d24e32de8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
