import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClYd0QLBNSnytvq4bfgETo743inXOmfnw",
  authDomain: "quickdonor-73586.firebaseapp.com",
  projectId: "quickdonor-73586",
  storageBucket: "quickdonor-73586.firebasestorage.app",
  messagingSenderId: "59914457848",
  appId: "G-YJWWM3RRDC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);
