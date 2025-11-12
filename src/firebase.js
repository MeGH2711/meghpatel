import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAUMdQNuapTkQ53pJCJuvmBEIwzU_3WyDk",
    authDomain: "portfolio-90795.firebaseapp.com",
    projectId: "portfolio-90795",
    storageBucket: "portfolio-90795.firebasestorage.app",
    messagingSenderId: "748580842078",
    appId: "1:748580842078:web:b757564b848d12ddba22cf",
    measurementId: "G-XQ9T5P7RDY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);